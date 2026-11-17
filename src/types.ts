export type LanguageCode =
  | 'en'
  | 'es'
  | 'pt'
  | 'fr'
  | 'de'
  | 'it'
  | 'ru'
  | 'ja'
  | 'ko'
  | 'ar';

export type SenderType = 'santa' | 'kings';

export type BehaviorType = 'super' | 'very' | 'trying';

export type ParchmentTheme = 'classic' | 'royal' | 'aurora' | 'certificate';

export type ActiveTab = 'home' | 'letter' | 'call' | 'wall';

export type AgeRangeBucket = '0-3' | '4-6' | '7-9' | '10-12' | '13+' | 'unknown';

export interface ChildEntry {
  id: string;
  name: string;
  age: string;
  gift: string;
}

export interface LetterData {
  children: ChildEntry[];
  city: string;
  behavior: BehaviorType;
  sender: SenderType;
  theme: ParchmentTheme;
  officialCode: string;
}

export interface WallPhoto {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  likes: number;
  createdAt: number;
  isSample?: boolean;
  reported?: boolean;
}

export interface AnonymousTrendRecord {
  id: string;
  countryOrCity: string;
  language: LanguageCode;
  age: string;
  ageRange: AgeRangeBucket;
  giftNormalized: string;
  timestamp: string;
}
