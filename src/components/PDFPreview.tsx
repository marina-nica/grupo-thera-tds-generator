import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useTheme } from '../context/ThemeContext';
import PDFDocument from './PDFDocument';

export default function PDFPreview() {
  const { brand, data } = useTheme();

  return (
    <div className="w-full h-full">
      <PDFViewer className="w-full h-full rounded-xl shadow-2xl border-0" showToolbar={true}>
        <PDFDocument brand={brand} data={data} />
      </PDFViewer>
    </div>
  );
}
