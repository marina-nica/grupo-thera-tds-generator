import { Page, View, Text, StyleSheet, Image as PDFImage } from '@react-pdf/renderer';
import { TDSData } from '../../types';
import { BRAND_THEMES } from '../../constants/brandThemes';
import TrilingualCell from '../PDF/TrilingualCell';
import Footer from '../PDF/Footer';

const COLORS = {
  primary: '#6cc7ba', // Nextep Teal
  accent: '#161616', // Dark
  light: '#b2e0e1',
  neutral: '#444',
  bgZebra: '#f1f1f1'
};

const styles = StyleSheet.create({
  page: {
    padding: 42,
    backgroundColor: '#FFFFFF',
    paddingBottom: 70, 
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Previne desalinhamento com títulos longos
  },
  titleArea: {
    flex: 1,
    marginRight: 20,
    height: 156,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerSku: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  headerDate: {
    fontSize: 10,
    fontWeight: 'normal',
  },
  imageSlot: {
    width: 156, 
    height: 156, 
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexShrink: 0, // Impede que a imagem seja espremida pelo texto
  },
  imagePlaceholder: {
    fontSize: 8,
    color: '#94a3b8',
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    color: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
    paddingBottom: 4,
    marginBottom: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    minHeight: 30,
    alignItems: 'center',
  },
  rowEven: {
    backgroundColor: COLORS.bgZebra,
  },
  colHeader: {
    width: '40%',
    backgroundColor: '#F8FAFC',
    padding: 8,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  colData: {
    width: '60%',
    padding: 8,
    fontSize: 8,
    color: '#333',
  },
  trilingualBlock: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 10,
  }
});

export default function NextepLayout({ data }: { data: TDSData }) {
  const theme = BRAND_THEMES.nextep;

  return (
    <Page size="A4" style={[styles.page, { fontFamily: theme.fontFamily }]}>
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <Text style={[styles.headerDate, { color: theme.updateDate, fontWeight: 'normal' }]}>Update: {data.updateDate}</Text>
          <View>
            <Text 
              style={[styles.headerTitle, { color: theme.productName, fontWeight: 'bold' }]}
              hyphenationCallback={(word) => [word]}
            >
              {data.productName}
            </Text>
            <Text style={[styles.headerSku, { color: theme.sku, fontWeight: 'bold' }]}>{data.sku}</Text>
          </View>
        </View>

        <View style={styles.imageSlot}>
          {data.productImage ? (
            <PDFImage src={data.productImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Text style={[styles.imagePlaceholder, { fontWeight: 'normal' }]}>PRODUCT IMAGE SLOT{"\n"}(650 x 650 px)</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description / Descrição / Descripción</Text>
        <View style={styles.trilingualBlock}>
           <TrilingualCell 
             pt={data.shortDescription.pt} 
             en={data.shortDescription.en} 
             es={data.shortDescription.es} 
             colorBase={COLORS.primary} 
           />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ESPECIFICAÇÕES / SPECIFICATIONS / ESPECIFICACIONES</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.colHeader}>
              <Text>Dimensões / Dimensions / Dimensiones</Text>
            </View>
            <View style={styles.colData}>
              <Text>{data.dimensions}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.rowEven]}>
            <View style={styles.colHeader}>
              <Text>Peso / Weight / Peso</Text>
            </View>
            <View style={styles.colData}>
              <Text>{data.weight}</Text>
            </View>
          </View>
          {data.customSections.map((sec, i) => (
            <View key={sec.id} style={[styles.row, (i + 2) % 2 !== 0 ? styles.rowEven : {}]} wrap={false}>
              <View style={styles.colHeader}>
                <Text>{sec.title.pt} / {sec.title.en} / {sec.title.es}</Text>
              </View>
              <View style={styles.colData}>
                <Text>{sec.value.pt} / {sec.value.en} / {sec.value.es}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Especificações por lote / Specifications per lot / Especificaciones por lote</Text>
         <View style={styles.table}>
            <View style={styles.row}>
               <Text style={styles.colHeader}>Dimensões da Caixa / Box Dimensions / Tamaño de caja</Text>
               <Text style={styles.colData}>{data.logistics.dimensionsBox}</Text>
            </View>
            <View style={[styles.row, styles.rowEven]}>
               <Text style={styles.colHeader}>Peso Bruto / Gross Weight / Peso Bruto</Text>
               <Text style={styles.colData}>{data.logistics.grossWeight}</Text>
            </View>
            <View style={styles.row}>
               <Text style={styles.colHeader}>Quantidade por caixa / Quantity per box / Cantidad por caixa</Text>
               <Text style={styles.colData}>{data.logistics.unitsPerBox}</Text>
            </View>
         </View>
      </View>

      <Footer brand="nextep" borderColor={COLORS.primary} />
    </Page>
  );
}
