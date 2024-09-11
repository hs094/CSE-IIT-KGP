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
import axios from "axios";

export default () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/doctor/list`).then((res) => {
      setDoctors(res.data.doctors);
    });
  }, []);

  return (
    <>
      <h1 className="text-center">List of All Doctors</h1>
      <DoctorTable doctorList={doctors} />
    </>
  );
};
