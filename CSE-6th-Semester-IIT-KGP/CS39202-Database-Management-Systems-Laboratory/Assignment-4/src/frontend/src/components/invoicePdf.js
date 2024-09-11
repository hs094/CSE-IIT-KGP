import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Font
  } from "@react-pdf/renderer";
import { Image } from '@react-pdf/renderer';
import ghl from '../assets/img/ghl.jpg';
import moment from 'moment';

// Create styles
const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Times-BoldItalic'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 15,
      textAlign: 'center',
      margin: 12,
      fontFamily: 'Times-Bold'
    },
    subcost: {
        fontSize: 15,
        textAlign: 'right',
        marginTop: 15,
        marginBottom: 4,
        fontFamily: 'Times-Bold'
    },
    subsig: {
      fontSize: 11,
      textAlign: 'right',
      margin: 3,
      fontFamily: 'Times-Roman'
  },
    text: {
      margin: 6,
      fontSize: 12,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: -30,
      marginBottom: 10,
      marginHorizontal: 168,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    viewer: {
    width: window.innerWidth*0.8, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  });
  

export default (props) => {
  const {data} = props;
  const date1 = moment(data.admit_date).format("DD/MM/YYYY");
  const start1 = moment(data.admit_date).format("hh:mm A");
  const date2 = moment(data.discharge_date).format("DD/MM/YYYY");
  const start2 = moment(data.discharge_date).format("hh:mm A");
  const date3 = moment(data.procedure_date).format("DD/MM/YYYY");
  const start3 = moment(data.procedure_date).format("hh:mm A");
  const date4 = moment(data.test_date).format("DD/MM/YYYY");
  const start4 = moment(data.test_date).format("hh:mm A");
    return (
        <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.body}>
        <Text style={styles.header} fixed>
           ~ Patient Invoice ~
        </Text>
        <Text style={styles.title}>Global Hospitals</Text>
        <Text style={styles.author}>C-32 Lane, Amherst Street, Kolkata-700009, West Bengal, India</Text>
        <Image
        style={styles.image}
        src={ghl}
      />
      <Text style={styles.subtitle}>Patient Details</Text>
      <Text style={styles.text}>Patient ID : {data.patient_id}</Text>
      <Text style={styles.text}>Patient Name : {data.patient_name}</Text>
      <Text style={styles.text}>Age : {data.patient_age}</Text>
      <Text style={styles.text}>Gender : {data.patient_gender}</Text>
      <Text style={styles.text}>Doctor Name : {data.doctor_name}</Text>

      <Text style={styles.subtitle}>Treatment Details</Text>
      <Text style={styles.text}>Illness Details : {data.illness_details}</Text>
      <Text style={styles.text}>Admit Date : {start1}, {date1}</Text>
      <Text style={styles.text}>Discharge Date : {start2}, {date2}</Text>
      <Text style={styles.text}>Stay Cost (Per Day) : Rs. {data.room_cost}</Text>

      <Text style={styles.subtitle}>Procedure Details</Text>
      <Text style={styles.text}>Procedure Name : {data.procedure_name}</Text>
      <Text style={styles.text}>Procedure Cost : {data.procedure_cost}</Text>
      <Text style={styles.text}>Procedure Date : {start3}, {date3}</Text>

      <Text style={styles.subtitle}>Test Details</Text>
      <Text style={styles.text}>Test Name : {data.test_name}</Text>
      <Text style={styles.text}>Test Date : {start4}, {date4}</Text>
      <Text style={styles.text}>Cost : {data.test_cost}</Text>

      <Text style={styles.subtitle}>Medication Details</Text>
      { data.medication && 
        data.medication.map(function(medication) {
          return(
            <>
          <Text style={styles.text}>Medicine Name : {medication.name}</Text>
          <Text style={styles.text}>Medicine Brand : {medication.brand}</Text>
          <Text style={styles.text}>Medicine Dose : {medication.dose_amount}</Text>
          <Text style={styles.text}>Medicine Cost : {medication.cost}</Text>
          <Text style={styles.text}> </Text>
          </>
          )
        })
      }

      <Text style={styles.subcost}>Total Cost : Rs. {data.totalcost}</Text>
      <Text style={styles.subcost}>--------------------------</Text>
      <Text style={styles.subsig}>(Signature and Seal)</Text>
      <Text style={styles.subtitle}>Thank You ! Best Wishes</Text>
      <Text style={styles.subtitle}>Emergency: 1800-8908-789</Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
        </Page>
      </Document>
    </PDFViewer>
    );
  }
  
