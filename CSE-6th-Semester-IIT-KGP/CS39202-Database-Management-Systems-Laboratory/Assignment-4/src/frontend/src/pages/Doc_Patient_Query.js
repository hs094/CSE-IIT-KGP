import PQuery from "../components/PQuery";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faSearch, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button,Form, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import AugmentedAxios from "../utils/augmentedAxios";
import { BACKEND_URL } from "../constants";
import { useState } from "react";

export default() => {
  const [patient, setPatient] = useState([]);
  const [patient_id, setPatient_id] = useState(0);
  const doctor_id = JSON.parse(localStorage.getItem("profile")).id;

    const handlesub = (e) => {
        e.preventDefault();
      AugmentedAxios.post(`${BACKEND_URL}/patient/getentirepatient`, {
        patient_id,
        doctor_id
      })
      .then((res) => {
         setPatient(res.data.details);
        if(res.data.details.length === 0) window.alert("Patient Details Not Found");
      })
      .catch((e) => {
        console.log(e);
      });

      }
    return (
        <>
        <h1 className="text-center">Patient Query</h1>
        <h6 className="text-center">(Only the patients you have treated can be queried)</h6>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Form className="navbar-search">
        <h6>Enter Patient ID of patient</h6>
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="number" placeholder="999" onChange={(e) => setPatient_id(e.target.value)}/>
                  <Button variant="info" className="me-2" style = {{color: "white"}} onClick = {handlesub}>
                  <span>Search Patient</span>
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
        </div>
        <PQuery patientdetails = {patient}/>
        </>
    );
};