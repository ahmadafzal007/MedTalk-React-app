// ReportDocument.jsx
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import logo from '../assets/logo.jpg'; // Ensure the path is correct
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: '50%', // Makes the logo circular
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // Centers the entire header
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: '2px solid #4a90e2',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  hospitalDetails: {
    textAlign: 'center',
    flexGrow: 1,
    marginLeft: 10, // Space from the logo
    marginTop: 5,    // Space above the hospital name
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reportTitle: {
    fontSize: 14,
    marginTop: 2,
    color: '#666',
  },
  doctorDetails: {
    textAlign: 'right',
    fontSize: 10,
    marginBottom: 8,
    color: '#444',
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 8,
    color: '#4a4a4a',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
    paddingBottom: 3,
  },
  demographicsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottom: '1px solid #ddd',
  },
  demographicsLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4a90e2',
    flexBasis: '30%',
  },
  demographicsValue: {
    fontSize: 10,
    flexBasis: '60%',
  },
  section: {
    margin: 5,
    padding: 10,
    border: '1px solid #4a90e2',
    borderRadius: 6,
    backgroundColor: '#fafafa',
  },
  footer: {
    marginTop: 10,
    fontSize: 9,
    textAlign: 'center',
    color: '#666',
  },
});

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
    <Page size="A4" style={styles.page}>
      {/* Header with logo and hospital name */}
      <View style={styles.section}>
        <View style={styles.headerContainer}>
          {/* Logo on the left */}
          <Image src={logo} style={styles.logo} />

          {/* Hospital name and title in the center */}
          <View style={styles.hospitalDetails}>
            <Text style={styles.hospitalName}>{hospitalName}</Text>
            <Text style={styles.reportTitle}>Patient Report</Text>
          </View>
        </View>

        {/* Doctor and Date information */}
        <Text style={styles.doctorDetails}>Doctor: {docName}</Text>
        <Text style={styles.doctorDetails}>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      {/* Patient Demographics Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Patient Demographics</Text>
        <View style={styles.demographicsRow}>
          <Text style={styles.demographicsLabel}>Patient Name:</Text>
          <Text style={styles.demographicsValue}>{patientName}</Text>
        </View>
        <View style={styles.demographicsRow}>
          <Text style={styles.demographicsLabel}>Patient CNIC:</Text>
          <Text style={styles.demographicsValue}>{patientCnic}</Text>
        </View>
        <View style={styles.demographicsRow}>
          <Text style={styles.demographicsLabel}>Gender:</Text>
          <Text style={styles.demographicsValue}>{patientGender}</Text>
        </View>
        <View style={styles.demographicsRow}>
          <Text style={styles.demographicsLabel}>Age:</Text>
          <Text style={styles.demographicsValue}>{age}</Text>
        </View>
        <View style={styles.demographicsRow}>
          <Text style={styles.demographicsLabel}>Nationality:</Text>
          <Text style={styles.demographicsValue}>{nationality}</Text>
        </View>
      </View>

      {/* Disease Detected Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Disease Detected</Text>
        <Text>{diseaseDetected}</Text>
      </View>

      {/* Medicine Recommendations Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Medicine Recommendations</Text>
        {medicineRecommendations.map((med, index) => (
          <Text key={index} style={{ marginLeft: 10 }}>
            {index + 1}. {med}
          </Text>
        ))}
      </View>

      {/* Special Instructions Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Special Instructions</Text>
        <Text>{specialInstructions}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>{hospitalName} - Committed to your health and wellbeing</Text>
      </View>
    </Page>
  </Document>
);

export default ReportDocument;
