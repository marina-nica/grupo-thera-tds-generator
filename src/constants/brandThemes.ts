import { BrandType } from "../types";

export interface BrandHeaderTheme {
  productName: string;
  sku: string;
  updateDate: string;
  fontFamily: string;
}

export const BRAND_THEMES: Record<BrandType, BrandHeaderTheme> = {
  theramart: {
    productName: '#1C355E',
    sku: '#3cb4e5',
    updateDate: '#2271ac',
    fontFamily: 'Mont',
  },
  nuvo: {
    productName: '#ff5d00',
    sku: '#ffba6f',
    updateDate: '#262626',
    fontFamily: 'SFCompact',
  },
  backbone: {
    productName: '#3b3260',
    sku: '#aa8fea',
    updateDate: '#2e2c2c',
    fontFamily: 'BreveSans',
  },
  nextep: {
    productName: '#161616',
    sku: '#6cc7ba',
    updateDate: '#b2e0e1',
    fontFamily: 'SizmoPro',
  },
};
