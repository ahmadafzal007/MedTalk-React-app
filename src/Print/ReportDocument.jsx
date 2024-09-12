import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import logo from '../assets/logo.jpg' // Path to your logo image

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: '50%',
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #ddd',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 20,
  },
  tableRow: {
    display: 'table-row',
  },
  tableCell: {
    display: 'table-cell',
    padding: 8,
    borderBottom: '1px solid #ddd',
  },
  tableHeaderCell: {
    display: 'table-cell',
    padding: 8,
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
})

const ReportDocument = ({
  docName,
  patientName,
  patientCnic,
  patientGender,
  age,
  nationality,
  diseaseDetected,
  medicineRecommendations,
  specialInstructions,
  hospitalName,
}) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Image src={logo} style={styles.logo} />
        <Text style={styles.header}>{hospitalName}</Text>
        <Text style={styles.header}>Patient Report</Text>
        <Text>Doctor: {docName}</Text>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Patient Demographics</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Patient Name</Text>
            <Text style={styles.tableCell}>{patientName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Patient CNIC</Text>
            <Text style={styles.tableCell}>{patientCnic}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Gender</Text>
            <Text style={styles.tableCell}>{patientGender}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Age</Text>
            <Text style={styles.tableCell}>{age}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Disease Detected</Text>
        <Text>{diseaseDetected}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Medicine Recommendations</Text>
        {medicineRecommendations.map((med, index) => (
          <Text key={index}>
            {index + 1}. {med}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Special Instructions</Text>
        <Text>{specialInstructions}</Text>
      </View>
    </Page>
  </Document>
)

export default ReportDocument
