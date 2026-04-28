export interface LocalizedText {
  en: string;
  fa: string;
  ar: string;
}

export interface Module {
  id: string;
  name: string;
  description: LocalizedText;
  features: string[];
  price: number; // OMR
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  modules: Module[];
}

export interface PackagePreset {
  id: string;
  name: string;
  tagline: string;
  description: string;
  moduleIds: string[];
  packagePrice: number;
  highlight?: boolean;
}
