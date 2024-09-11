import { AdmittedPatientTable } from "../components/Widgets";
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
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/stay/getalladmitted`).then((res) => {
      setPatients(res.data.patients);
    });
  }, []);

  return (
    <>
      <h1 className="text-center">List of All Patients</h1>
      <AdmittedPatientTable patientList={patients} />
    </>
  );
};
