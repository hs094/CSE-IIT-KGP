import {
  PatientTableForAppointDoc,
  PatientTableForDoc,
} from "../components/Widgets";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import AugmentedAxios from "../utils/augmentedAxios";

export default () => {
  const [treatedPatients, setTreatedPatients] = useState([]);
  const [appointPatients, setAppointPatients] = useState([]);

  useEffect(() => {
    const docId = JSON.parse(localStorage.getItem("profile")).id;
    if (!docId) alert("Please login");

    AugmentedAxios.get(`${BACKEND_URL}/patient/treatmentlist?doctor_id=${docId}`)
      .then((res) => {
        setTreatedPatients(res.data.treatments);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const docId = JSON.parse(localStorage.getItem("profile")).id;
    if (!docId) alert("Please login");

    AugmentedAxios.get(`${BACKEND_URL}/patient/appointmentlist?doctor_id=${docId}`)
      .then((res) => {
        setAppointPatients(res.data.appointments);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <h1 className="text-center">List of Treated Patients</h1>
      <PatientTableForDoc patients={treatedPatients} />
      <br />
      <h1 className="text-center">List of Patients with Appointments</h1>
      <PatientTableForAppointDoc appointments={appointPatients} />
    </>
  );
};
