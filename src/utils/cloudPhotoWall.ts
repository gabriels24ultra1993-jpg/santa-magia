import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { WallPhoto } from '../types';
import { isValidPhotoUrlOrData, sanitizeFinalText } from './security';

const PODIUM_COLLECTION = 'podium_top3';
const CAROUSEL_COLLECTION = 'wall_carousel';
export const MAX_CAROUSEL_PHOTOS = 25;

const SAMPLE_IMAGE_URLS = [
  '/src/assets/images/xmas_wall_tree_family_1794938715878.jpg',
  '/src/assets/images/xmas_wall_cookies_santa_1794938716150.jpg',
  '/src/assets/images/xmas_wall_snowy_cabin_1794938717250.jpg',
  '/src/assets/images/xmas_wall_stockings_hearth_1794938718097.jpg',
];

const INITIAL_SAMPLE_LIKES = [42, 35, 29, 21];

const SLOT_IDS = ['rank_1', 'rank_2', 'rank_3'] as const;

interface PodiumDocShape {
  slotRank: number;
  photoId: string;
  title: string;
  author: string;
  imageUrl: string;
  likes: number;
  createdAt: number;
  isSample?: boolean;
  reported: boolean;
}

export function sortPhotosByLikes(photos: WallPhoto[]): WallPhoto[] {
  return [...photos]
    .filter((p) => !p.reported)
    .sort((a, b) => b.likes - a.likes || b.createdAt - a.createdAt);
}

function sanitizeSafeWallPhoto(photo: WallPhoto): WallPhoto {
  return {
    ...photo,
    id: photo.id.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 128) || `photo-${Date.now()}`,
    title: sanitizeFinalText(photo.title, 80) || 'Christmas Moment',
    author: sanitizeFinalText(photo.author, 50) || 'Family',
    imageUrl: isValidPhotoUrlOrData(photo.imageUrl) ? photo.imageUrl : SAMPLE_IMAGE_URLS[0],
    likes: Math.max(0, Math.min(1000000, Math.round(photo.likes))),
    createdAt: Math.max(1700000000000, Math.round(photo.createdAt)),
  };
}

export function subscribePodiumTop3(
  onUpdate: (podiumPhotos: WallPhoto[]) => void,
  onError?: (err: unknown) => void
): () => void {
  const q = query(
    collection(db, PODIUM_COLLECTION),
    where('slotRank', '>=', 1),
    where('slotRank', '<=', 3),
    orderBy('slotRank', 'asc')
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const list: WallPhoto[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data() as PodiumDocShape;
        if (!d.reported && isValidPhotoUrlOrData(d.imageUrl)) {
          list.push(
            sanitizeSafeWallPhoto({
              id: d.photoId,
              title: d.title,
              author: d.author,
              imageUrl: d.imageUrl,
              likes: d.likes,
              createdAt: d.createdAt,
              isSample: Boolean(d.isSample),
              reported: Boolean(d.reported),
            })
          );
        }
      });
      onUpdate(sortPhotosByLikes(list).slice(0, 3));
    },
    (error) => {
      if (onError) onError(error);
      try {
        handleFirestoreError(error, OperationType.GET, PODIUM_COLLECTION);
      } catch {
        // Error surfaced cleanly to caller
      }
    }
  );
}

export async function fetchCarouselPhotos(): Promise<WallPhoto[]> {
  try {
    const q = query(
      collection(db, CAROUSEL_COLLECTION),
      where('reported', '==', false),
      limit(30)
    );
    const snap = await getDocs(q);
    const photos: WallPhoto[] = [];
    snap.forEach((docSnap) => {
      const d = docSnap.data() as WallPhoto;
      if (isValidPhotoUrlOrData(d.imageUrl)) {
        photos.push(
          sanitizeSafeWallPhoto({
            id: d.id || docSnap.id,
            title: d.title,
            author: d.author,
            imageUrl: d.imageUrl,
            likes: d.likes,
            createdAt: d.createdAt,
            isSample: Boolean(d.isSample),
            reported: Boolean(d.reported),
          })
        );
      }
    });

    return photos
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_CAROUSEL_PHOTOS);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, CAROUSEL_COLLECTION);
  }
}

export async function seedInitialCloudWallIfEmpty(
  localizedSamples: Array<{ id: string; title: string; author: string }>
): Promise<{ podium: WallPhoto[]; carousel: WallPhoto[] }> {
  try {
    const existingCarousel = await fetchCarouselPhotos();
    const podiumQ = query(
      collection(db, PODIUM_COLLECTION),
      where('slotRank', '>=', 1),
      where('slotRank', '<=', 3),
      orderBy('slotRank', 'asc')
    );
    const podiumSnap = await getDocs(podiumQ);

    if (existingCarousel.length > 0 && !podiumSnap.empty) {
      const podiumList: WallPhoto[] = [];
      podiumSnap.forEach((s) => {
        const d = s.data() as PodiumDocShape;
        if (!d.reported && isValidPhotoUrlOrData(d.imageUrl)) {
          podiumList.push(
            sanitizeSafeWallPhoto({
              id: d.photoId,
              title: d.title,
              author: d.author,
              imageUrl: d.imageUrl,
              likes: d.likes,
              createdAt: d.createdAt,
              isSample: Boolean(d.isSample),
              reported: false,
            })
          );
        }
      });
      return { podium: sortPhotosByLikes(podiumList).slice(0, 3), carousel: existingCarousel };
    }

    const baseTime = 1700000000000;
    const starterPhotos: WallPhoto[] = localizedSamples.map((sp, idx) =>
      sanitizeSafeWallPhoto({
        id: sp.id,
        title: sp.title,
        author: sp.author,
        imageUrl: SAMPLE_IMAGE_URLS[idx] || SAMPLE_IMAGE_URLS[0],
        likes: INITIAL_SAMPLE_LIKES[idx] ?? 20,
        createdAt: baseTime - idx * 100000,
        isSample: true,
        reported: false,
      })
    );

    if (existingCarousel.length === 0) {
      for (const p of starterPhotos) {
        await setDoc(doc(db, CAROUSEL_COLLECTION, p.id), {
          id: p.id,
          title: p.title,
          author: p.author,
          imageUrl: p.imageUrl,
          likes: p.likes,
          createdAt: p.createdAt,
          isSample: true,
          reported: false,
        });
      }
    }

    const topSource = existingCarousel.length > 0 ? existingCarousel : starterPhotos;
    await syncPodiumTop3(topSource);

    return {
      podium: sortPhotosByLikes(topSource).slice(0, 3),
      carousel: topSource,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, CAROUSEL_COLLECTION);
  }
}

export async function syncPodiumTop3(allKnownPhotos: WallPhoto[]): Promise<WallPhoto[]> {
  const uniqueById = new Map<string, WallPhoto>();
  for (const p of allKnownPhotos) {
    if (!p.reported) {
      const clean = sanitizeSafeWallPhoto(p);
      const existing = uniqueById.get(clean.id);
      if (!existing || clean.likes > existing.likes) {
        uniqueById.set(clean.id, clean);
      }
    }
  }

  const top3 = sortPhotosByLikes(Array.from(uniqueById.values())).slice(0, 3);

  try {
    for (let i = 0; i < top3.length; i++) {
      const item = top3[i];
      const slotId = SLOT_IDS[i];
      await setDoc(doc(db, PODIUM_COLLECTION, slotId), {
        slotRank: i + 1,
        photoId: item.id,
        title: item.title,
        author: item.author,
        imageUrl: item.imageUrl,
        likes: item.likes,
        createdAt: item.createdAt,
        isSample: Boolean(item.isSample),
        reported: false,
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PODIUM_COLLECTION);
  }

  return top3;
}

/**
 * Inserts a new WebP photo (~30KB) into the 25-slot FIFO carousel without using document deletion
 * (`allow delete: if false` in firestore.rules): when 25 slots are full, the oldest non-podium
 * slot is atomically recycled in-place.
 */
export async function uploadPhotoToCloudCarousel(
  newPhoto: WallPhoto,
  currentPodium: WallPhoto[]
): Promise<WallPhoto[]> {
  const safePhoto = sanitizeSafeWallPhoto({ ...newPhoto, likes: 1, isSample: false, reported: false });

  try {
    const latest = await fetchCarouselPhotosWithUnboundedCheck();
    const podiumIds = new Set(currentPodium.map((p) => p.id));

    if (latest.length >= MAX_CAROUSEL_PHOTOS) {
      const evictable = [...latest]
        .filter((p) => !podiumIds.has(p.id))
        .sort((a, b) => a.createdAt - b.createdAt);

      const victim = evictable[0];
      if (victim) {
        await setDoc(doc(db, CAROUSEL_COLLECTION, victim.id), {
          id: victim.id,
          title: safePhoto.title,
          author: safePhoto.author,
          imageUrl: safePhoto.imageUrl,
          likes: 1,
          createdAt: Math.max(safePhoto.createdAt, victim.createdAt + 1),
          isSample: false,
          reported: false,
        });
      } else {
        await setDoc(doc(db, CAROUSEL_COLLECTION, safePhoto.id), {
          id: safePhoto.id,
          title: safePhoto.title,
          author: safePhoto.author,
          imageUrl: safePhoto.imageUrl,
          likes: 1,
          createdAt: safePhoto.createdAt,
          isSample: false,
          reported: false,
        });
      }
    } else {
      await setDoc(doc(db, CAROUSEL_COLLECTION, safePhoto.id), {
        id: safePhoto.id,
        title: safePhoto.title,
        author: safePhoto.author,
        imageUrl: safePhoto.imageUrl,
        likes: 1,
        createdAt: safePhoto.createdAt,
        isSample: false,
        reported: false,
      });
    }

    const refreshed = await fetchCarouselPhotos();
    await syncPodiumTop3([...currentPodium, ...refreshed]);
    return refreshed;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, CAROUSEL_COLLECTION);
  }
}

async function fetchCarouselPhotosWithUnboundedCheck(): Promise<WallPhoto[]> {
  const q = query(
    collection(db, CAROUSEL_COLLECTION),
    where('reported', '==', false),
    limit(40)
  );
  const snap = await getDocs(q);
  const list: WallPhoto[] = [];
  snap.forEach((s) => {
    const d = s.data() as WallPhoto;
    if (isValidPhotoUrlOrData(d.imageUrl)) {
      list.push(
        sanitizeSafeWallPhoto({
          id: d.id || s.id,
          title: d.title,
          author: d.author,
          imageUrl: d.imageUrl,
          likes: d.likes,
          createdAt: d.createdAt,
          isSample: Boolean(d.isSample),
          reported: Boolean(d.reported),
        })
      );
    }
  });
  return list;
}

export async function toggleLikeInCloud(
  photo: WallPhoto,
  currentPodium: WallPhoto[],
  currentCarousel: WallPhoto[]
): Promise<{ podium: WallPhoto[]; carousel: WallPhoto[] }> {
  const nextLikes = Math.max(0, photo.likes + 1);

  try {
    const inCarousel = currentCarousel.some((p) => p.id === photo.id);
    if (inCarousel) {
      await updateDoc(doc(db, CAROUSEL_COLLECTION, photo.id), {
        likes: nextLikes,
      });
    }

    const updatedCarousel = currentCarousel.map((p) =>
      p.id === photo.id ? { ...p, likes: nextLikes } : p
    );
    const updatedPodiumBase = currentPodium.map((p) =>
      p.id === photo.id ? { ...p, likes: nextLikes } : p
    );

    const nextPodium = await syncPodiumTop3([...updatedPodiumBase, ...updatedCarousel]);
    return { podium: nextPodium, carousel: updatedCarousel };
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, CAROUSEL_COLLECTION);
  }
}

export async function reportPhotoInCloud(
  photoId: string,
  currentPodium: WallPhoto[],
  currentCarousel: WallPhoto[]
): Promise<{ podium: WallPhoto[]; carousel: WallPhoto[] }> {
  try {
    if (currentCarousel.some((p) => p.id === photoId)) {
      await updateDoc(doc(db, CAROUSEL_COLLECTION, photoId), {
        reported: true,
      });
    }

    const podiumIndex = currentPodium.findIndex((p) => p.id === photoId);
    if (podiumIndex >= 0 && podiumIndex < SLOT_IDS.length) {
      await updateDoc(doc(db, PODIUM_COLLECTION, SLOT_IDS[podiumIndex]), {
        reported: true,
      });
    }

    const remainingCarousel = currentCarousel.filter((p) => p.id !== photoId);
    const remainingPodium = currentPodium.filter((p) => p.id !== photoId);
    const nextPodium = await syncPodiumTop3([...remainingPodium, ...remainingCarousel]);
    return { podium: nextPodium, carousel: remainingCarousel };
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, CAROUSEL_COLLECTION);
  }
}
