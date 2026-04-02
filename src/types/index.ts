export type BrandType = 'backbone' | 'theramart' | 'nuvo' | 'nextep';

export interface TrilingualField {
  pt: string;
  en: string;
  es: string;
}

export interface CustomSection {
  id: string;
  title: TrilingualField; // Category Title
  value: TrilingualField; // Technical Value
}

export interface LogisticsData {
  dimensionsProd: string;
  netWeight: string;   
  unitsPerBox: string;
  dimensionsBox: string;
  grossWeight: string; 
}

export interface TDSData {
  productName: string;
  sku: string;
  updateDate: string;
  shortDescription: TrilingualField;
  dimensions: string;
  weight: string;
  materials: TrilingualField;
  careInstructions: TrilingualField;
  logistics: LogisticsData;
  customSections: CustomSection[];
  productImage?: string; // Base64 data URL
}
