import { AdmitForm } from "../components/admit_form";
import {
  DoctorTable,
  PatientTable,
  RoomTable,
  MedicationList,
} from "../components/Widgets";
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
import axios from "axios";
import AugmentedAxios from "../utils/augmentedAxios";

export default () => {
  const [medication, setMedication] = useState([]);

  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/medication/list`)
      .then((res) => {
        setMedication(res.data.medications);
        console.log(res.data.medications);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <h1 className="text-center">List of All Medicines</h1>
      <MedicationList AllMedicationList={medication} />
    </>
  );
};
