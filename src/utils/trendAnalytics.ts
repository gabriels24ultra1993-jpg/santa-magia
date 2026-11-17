import { AgeRangeBucket, AnonymousTrendRecord, LanguageCode } from '../types';
import { sanitizeFinalText } from './security';

const TRENDS_STORAGE_KEY = 'santa_magia_trends_v1';

export function computeAgeRange(rawAge: string): AgeRangeBucket {
  const match = rawAge.match(/\d+/);
  if (!match) return 'unknown';
  const num = parseInt(match[0], 10);
  if (Number.isNaN(num)) return 'unknown';
  if (num <= 3) return '0-3';
  if (num <= 6) return '4-6';
  if (num <= 9) return '7-9';
  if (num <= 12) return '10-12';
  return '13+';
}

export function normalizeGiftText(gift: string): string {
  return sanitizeFinalText(gift, 80)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .slice(0, 80);
}

const INITIAL_ANONYMOUS_SEED: AnonymousTrendRecord[] = [
  { id: 't-1', countryOrCity: 'Madrid, Spain', language: 'es', age: '7', ageRange: '7-9', giftNormalized: 'bicicleta', timestamp: '2026-11-10T14:10:00.000Z' },
  { id: 't-2', countryOrCity: 'New York, USA', language: 'en', age: '6', ageRange: '4-6', giftNormalized: 'lego star wars', timestamp: '2026-11-11T16:22:00.000Z' },
  { id: 't-3', countryOrCity: 'São Paulo, Brazil', language: 'pt', age: '5', ageRange: '4-6', giftNormalized: 'lego star wars', timestamp: '2026-11-11T19:05:00.000Z' },
  { id: 't-4', countryOrCity: 'London, UK', language: 'en', age: '8', ageRange: '7-9', giftNormalized: 'nintendo switch', timestamp: '2026-11-12T10:15:00.000Z' },
  { id: 't-5', countryOrCity: 'Tokyo, Japan', language: 'ja', age: '6', ageRange: '4-6', giftNormalized: 'nintendo switch', timestamp: '2026-11-12T12:40:00.000Z' },
  { id: 't-6', countryOrCity: 'Paris, France', language: 'fr', age: '5', ageRange: '4-6', giftNormalized: 'lego star wars', timestamp: '2026-11-13T09:30:00.000Z' },
  { id: 't-7', countryOrCity: 'Berlin, Germany', language: 'de', age: '9', ageRange: '7-9', giftNormalized: 'skateboard', timestamp: '2026-11-13T15:18:00.000Z' },
  { id: 't-8', countryOrCity: 'Seoul, South Korea', language: 'ko', age: '7', ageRange: '7-9', giftNormalized: 'robot kit', timestamp: '2026-11-14T08:50:00.000Z' },
  { id: 't-9', countryOrCity: 'Buenos Aires, Argentina', language: 'es', age: '8', ageRange: '7-9', giftNormalized: 'pelota de futbol', timestamp: '2026-11-14T20:10:00.000Z' },
  { id: 't-10', countryOrCity: 'Milan, Italy', language: 'it', age: '4', ageRange: '4-6', giftNormalized: 'dollhouse', timestamp: '2026-11-15T11:25:00.000Z' },
  { id: 't-11', countryOrCity: 'Moscow, Russia', language: 'ru', age: '6', ageRange: '4-6', giftNormalized: 'train set', timestamp: '2026-11-15T13:45:00.000Z' },
  { id: 't-12', countryOrCity: 'Riyadh, Saudi Arabia', language: 'ar', age: '10', ageRange: '10-12', giftNormalized: 'tablet', timestamp: '2026-11-15T17:30:00.000Z' },
  { id: 't-13', countryOrCity: 'Mexico City, Mexico', language: 'es', age: '7', ageRange: '7-9', giftNormalized: 'bicicleta', timestamp: '2026-11-16T09:12:00.000Z' },
  { id: 't-14', countryOrCity: 'Austin, USA', language: 'en', age: '5', ageRange: '4-6', giftNormalized: 'art supplies', timestamp: '2026-11-16T14:00:00.000Z' },
  { id: 't-15', countryOrCity: 'Toronto, Canada', language: 'en', age: '9', ageRange: '7-9', giftNormalized: 'lego star wars', timestamp: '2026-11-16T18:20:00.000Z' },
  { id: 't-16', countryOrCity: 'Bogotá, Colombia', language: 'es', age: '6', ageRange: '4-6', giftNormalized: 'patinete', timestamp: '2026-11-17T07:45:00.000Z' },
];

export function loadAnonymousTrends(): AnonymousTrendRecord[] {
  try {
    const raw = localStorage.getItem(TRENDS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AnonymousTrendRecord[];
      if (Array.isArray(parsed)) return parsed;
    }
    localStorage.setItem(TRENDS_STORAGE_KEY, JSON.stringify(INITIAL_ANONYMOUS_SEED));
    return INITIAL_ANONYMOUS_SEED;
  } catch {
    return INITIAL_ANONYMOUS_SEED;
  }
}

/**
 * Modular anonymous trend collector (COPPA/GDPR-K compliant).
 * Strictly strips all personal identifiers (no child names, no phone numbers).
 * Ready to connect directly to Supabase or Firebase Firestore:
 *   - Supabase: await supabase.from('christmas_trends').insert(record)
 *   - Firestore: await addDoc(collection(db, 'christmas_trends'), record)
 */
export async function saveAnonymousTrend(data: {
  countryOrCity: string;
  language: LanguageCode;
  age: string;
  gift: string;
}): Promise<AnonymousTrendRecord | null> {
  const giftNormalized = normalizeGiftText(data.gift);
  if (!giftNormalized) return null;

  const record: AnonymousTrendRecord = {
    id: `tr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    countryOrCity: sanitizeFinalText(data.countryOrCity, 60) || 'Unspecified',
    language: data.language,
    age: sanitizeFinalText(data.age, 10) || '-',
    ageRange: computeAgeRange(data.age),
    giftNormalized,
    timestamp: new Date().toISOString(),
  };

  try {
    const current = loadAnonymousTrends();
    const updated = [record, ...current];
    localStorage.setItem(TRENDS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage limits gracefully
  }

  return record;
}

export interface TopGiftStat {
  gift: string;
  count: number;
  percentage: number;
}

export function getTopGifts(records: AnonymousTrendRecord[], limit = 10): TopGiftStat[] {
  const total = records.length;
  if (total === 0) return [];

  const counts = new Map<string, number>();
  for (const r of records) {
    counts.set(r.giftNormalized, (counts.get(r.giftNormalized) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([gift, count]) => ({
      gift,
      count,
      percentage: Math.round((count / total) * 1000) / 10,
    }));
}

function escapeCsvCell(value: string | number): string {
  let str = sanitizeFinalText(String(value), 200);
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportTrendsToCsv(records: AnonymousTrendRecord[]): void {
  const headers = [
    'ID',
    'Timestamp_UTC',
    'Country_or_City',
    'Language',
    'Age',
    'Age_Range',
    'Gift_Normalized',
  ];

  const rows = records.map((r) => [
    r.id,
    r.timestamp,
    r.countryOrCity,
    r.language.toUpperCase(),
    r.age,
    r.ageRange,
    r.giftNormalized,
  ]);

  const csvContent =
    '\uFEFF' +
    [headers, ...rows]
      .map((row) => row.map(escapeCsvCell).join(','))
      .join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateTag = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `santa-magia-trends-${dateTag}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
