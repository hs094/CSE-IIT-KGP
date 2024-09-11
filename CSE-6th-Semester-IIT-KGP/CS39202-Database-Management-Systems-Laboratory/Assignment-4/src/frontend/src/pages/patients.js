import { AdmitForm } from "../components/admit_form";
import { DoctorTable, PatientTable, RoomTable } from "../components/Widgets";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";

export default () => {
  const [Patient, setPatient] = useState([]);
  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/patient/list`).then((res) => {
      setPatient(res.data.patientList);
    });
  }, []);

  return (
    <>
      <h1 className="text-center">List of All Patients</h1>
      <PatientTable AllPatientList={Patient} />
    </>
  );
};
