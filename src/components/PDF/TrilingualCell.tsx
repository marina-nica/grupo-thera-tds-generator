import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    paddingRight: 10,
  },
  langLabel: {
    fontSize: 7,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 9,
    lineHeight: 1.3,
  }
});

interface TrilingualCellProps {
  pt: string;
  en: string;
  es: string;
  colorBase: string; // brand color
  colorText?: string;
  renderAsBullets?: boolean;
}

export default function TrilingualCell({ pt, en, es, colorBase, colorText = '#333', renderAsBullets = false }: TrilingualCellProps) {
  const renderContent = (text: string) => {
    if (!text) return null;
    if (renderAsBullets) {
      const items = text.split('\n').filter(t => t.trim().length > 0);
      return items.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
           <Text style={{ width: 8, fontSize: 9, color: colorText }}>•</Text>
           <Text style={[styles.content, { flex: 1, color: colorText }]}>{item.trim()}</Text>
        </View>
      ));
    }
    return <Text style={[styles.content, { color: colorText }]}>{text}</Text>;
  };

  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.cell}>
        <Text style={[styles.langLabel, { color: colorBase }]}>PT</Text>
        {renderContent(pt)}
      </View>
      <View style={styles.cell}>
        <Text style={[styles.langLabel, { color: colorBase }]}>EN</Text>
        {renderContent(en)}
      </View>
      <View style={styles.cell}>
        <Text style={[styles.langLabel, { color: colorBase }]}>SPA</Text>
        {renderContent(es)}
      </View>
    </View>
  );
}
