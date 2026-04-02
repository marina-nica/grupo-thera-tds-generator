import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BrandType, TDSData } from '../types';

interface ThemeContextProps {
  brand: BrandType;
  setBrand: (brand: BrandType) => void;
  data: TDSData;
  setData: React.Dispatch<React.SetStateAction<TDSData>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const DEFAULT_DATA: TDSData = {
  productName: '',
  sku: '',
  updateDate: new Date().toISOString().split('T')[0],
  shortDescription: { pt: '', en: '', es: '' },
  dimensions: '',
  weight: '',
  materials: { pt: '', en: '', es: '' },
  careInstructions: { pt: '', en: '', es: '' },
  logistics: {
    dimensionsProd: '',
    netWeight: '',
    unitsPerBox: '',
    dimensionsBox: '',
    grossWeight: '',
  },
  customSections: [
    { 
      id: 'materials-default', 
      title: { pt: 'Materiais', en: '', es: '' }, 
      value: { pt: '', en: '', es: '' } 
    },
    { 
      id: 'care-default', 
      title: { pt: 'Instruções de cuidado', en: '', es: '' }, 
      value: { pt: '', en: '', es: '' } 
    },
  ],
  productImage: '',
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [brand, setBrand] = useState<BrandType>('theramart');
  const [data, setData] = useState<TDSData>(DEFAULT_DATA);

  return (
    <ThemeContext.Provider value={{ brand, setBrand, data, setData }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
