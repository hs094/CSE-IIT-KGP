import { AdmitForm } from "../components/admit_form";
import { PatientTable, RoomTable } from "../components/Widgets";
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import React from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import AugmentedAxios from "../utils/augmentedAxios";
import { useState, useEffect } from "react";

export default() => {
  const [AvlRoom, setRoom] = useState([]);
  const [Patients, setPatient] = useState([]);
  useEffect(() => {
  AugmentedAxios.get(`${BACKEND_URL}/room/freelist`).then((res) => {
    setRoom(res.data.roomList);
  });
}, []);
useEffect(() => {
  AugmentedAxios.get(`${BACKEND_URL}/patient/list`).then((res) => {
    setPatient(res.data.patientList);
  });
}, []);
    return (
        <>
        <h1 className="text-center">Patient Admission</h1>
        <AdmitForm />
        <Row>
        <Col xs={12} xl={6}>
          <PatientTable AllPatientList={Patients}/>
        </Col>
        <Col xs = {12} xl={6}>
      < RoomTable AvlRoomList={AvlRoom}/>
      </Col>
        </Row>
        </>
    );
};