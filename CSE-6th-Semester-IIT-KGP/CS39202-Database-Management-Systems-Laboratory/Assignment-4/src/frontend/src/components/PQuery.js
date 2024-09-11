import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup, Modal } from '@themesberg/react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import AugmentedAxios from "../utils/augmentedAxios";
import { BACKEND_URL, FILE_URL } from "../constants";
import { PatientMedicationList } from "./Widgets";
import './styles.css';

export default (props) => {
  const { patientdetails } = props;
  const [id, setId] = useState(0);
  const [medication, setMedication] = useState([]);
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const handleSubmit = (e) => {
    AugmentedAxios.get(`${BACKEND_URL}/patient/getmedicationbytreatment?id=${e}`).then(
      (result) =>{
        setMedication(result.data.medic);
        setShowDefault(true);
      }
    ).catch((error) => {
      console.log(error);
    })
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
      <Accordion>
      {patientdetails.map((patient) => {
        const date = moment(patient.date).format("DD/MM/YYYY");
      return(
      <Accordion.Item eventKey={patient.treatment_id}>
        <Accordion.Header><b>{patient.patient_name} - {date}</b></Accordion.Header>
        <Accordion.Body >
              <h5 style = {{fontWeight: "bold"}}>General Information: </h5>
              <h6>Name: {patient.patient_name}</h6>
              <h6>Gender: {patient.gender}</h6>
              <h6>Age: {patient.age}</h6>
              <h6>Phone: {patient.phone}</h6>
              <hr />
              <h5 style = {{fontWeight: "bold"}}>Treatment Details: </h5>
              <h6>Treatment ID: {patient.treatment_id}</h6>
              <h6>Treatment Date: {date}</h6>
              <h6 style = {{fontSize: "18px", color: "black"}}>Illness Details: <span style = {{fontSize: "16px", color: "black"}}>{patient.illness_details}</span> </h6>
              <h6>Room Details: {patient.room}</h6>
              <h6>Files: <a href={`${FILE_URL}${patient.file_url.slice(7)}`} style = {{color: "blue"}} target = "_blank"><u>Treatment File</u></a></h6>
              <h6>Procedure Name: {patient.procedure_name}</h6>
              <hr />
              <h5 style = {{fontWeight: "bold"}}>Test Details: </h5>
              <h6>Test Name: {patient.name}</h6>
              <h6>Test Report: <a href={`${FILE_URL}${patient.test_file_url.slice(7)}`} style = {{color: "blue"}} target = "_blank"><u>Test File</u></a></h6>
              <hr />
              <h5 style = {{fontWeight: "bold"}}>Medication Details: </h5>
              <Button variant="success" className="me-2" style = {{color: "white", fontSize: "14px"}} onClick = {() => handleSubmit(patient.treatment_id)}>
                Get Medication Details
              </Button>
        </Accordion.Body>
      </Accordion.Item>
      )
        })
      }
      </Accordion> 
      <div className="mt-3">
            <span>
              <React.Fragment>
                <Modal as={Modal.Dialog} contentClassName="custom-modal-style" centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <h5 className="text-center">Medication List of the Patient</h5>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                    <PatientMedicationList PatientMedicationList = {medication} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" className = "ms-auto" onClick={handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
            </span>
          </div>
      </Card.Body>
    </Card>
  );
};
