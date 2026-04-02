import { Document, Font } from '@react-pdf/renderer';
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
    { src: `${import.meta.env.BASE_URL}fonts/Mont-Regular.otf`, fontWeight: 400 },
    { src: `${import.meta.env.BASE_URL}fonts/Mont-Heavy.otf`, fontWeight: 700 },
  ],
});

Font.register({
  family: 'SFCompact',
  fonts: [
    { src: `${import.meta.env.BASE_URL}fonts/SFCompactDisplay-Light.otf`, fontWeight: 400 },
    { src: `${import.meta.env.BASE_URL}fonts/SFCompactDisplay-Bold.otf`, fontWeight: 700 },
  ],
});

Font.register({
  family: 'BreveSans',
  fonts: [
    { src: `${import.meta.env.BASE_URL}fonts/Breve Sans Text Light.otf`, fontWeight: 400 },
    { src: `${import.meta.env.BASE_URL}fonts/Breve Sans Text Bold.otf`, fontWeight: 700 },
  ],
});

Font.register({
  family: 'SizmoPro',
  fonts: [
    { src: `${import.meta.env.BASE_URL}fonts/SizmoPro.ttf`, fontWeight: 400 },
    { src: `${import.meta.env.BASE_URL}fonts/SizmoPro-Bold.ttf`, fontWeight: 700 },
  ],
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
