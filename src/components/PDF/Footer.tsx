import { BrandType } from '../../types';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 42.5,
    right: 42.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  logo: {
    height: 15,
    width: 'auto',
  },
  theraChancela: {
    fontSize: 7,
    color: '#666',
    textAlign: 'right',
  }
});

interface FooterProps {
  brand: BrandType;
  borderColor: string;
}

export default function Footer({ brand, borderColor }: FooterProps) {
  const logoPath = `/logos/${brand}.png`;
  
  return (
    <View style={[styles.footer, { borderTopColor: borderColor }]} fixed>
      <Image src={logoPath} style={styles.logo} />
      <Text style={styles.theraChancela}>
        A brand of Grupo Thera Inc. • Uma marca do grupo Thera Inc. • Una marca de Grupo Thera Inc.
      </Text>
    </View>
  );
}
