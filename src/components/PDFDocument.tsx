import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { BrandType, TDSData } from '../types';
import TheramartLayout from './BrandLayouts/TheramartLayout';
import NuvoLayout from './BrandLayouts/NuvoLayout';
import BackboneLayout from './BrandLayouts/BackboneLayout';
import NextepLayout from './BrandLayouts/NextepLayout';

interface PDFDocumentProps {
  brand: BrandType;
  data: TDSData;
}

// Desabilitar hifenização global para evitar quebra de palavras no meio (forçando Word-Wrap)
Font.registerHyphenationCallback(word => [word]);

// Registro de Fontes Customizadas
Font.register({
  family: 'Mont',
  fonts: [
    { src: '/fonts/Mont-Regular.otf', fontWeight: 400 },
    { src: '/fonts/Mont-Heavy.otf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'SFCompact',
  fonts: [
    { src: '/fonts/SFCompactDisplay-Light.otf', fontWeight: 400 },
    { src: '/fonts/SFCompactDisplay-Bold.otf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'BreveSans',
  fonts: [
    { src: '/fonts/Breve Sans Text Light.otf', fontWeight: 400 },
    { src: '/fonts/Breve Sans Text Bold.otf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'SizmoPro',
  fonts: [
    { src: '/fonts/SizmoPro.ttf', fontWeight: 400 },
    { src: '/fonts/SizmoPro-Bold.ttf', fontWeight: 700 },
  ],
});


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
});

export default function PDFDocument({ brand, data }: PDFDocumentProps) {
  const renderLayout = () => {
    switch (brand) {
      case 'theramart':
        return <TheramartLayout data={data} />;
      case 'nuvo':
        return <NuvoLayout data={data} />;
      case 'backbone':
        return <BackboneLayout data={data} />;
      case 'nextep':
        return <NextepLayout data={data} />;
      default:
        return <TheramartLayout data={data} />;
    }
  };

  return (
    <Document title={`${data.sku} - TDS`}>
      {renderLayout()}
    </Document>
  );
}
