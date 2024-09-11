import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import AugmentedAxios from "../utils/augmentedAxios";
import { BACKEND_URL } from "../constants";
import emailjs from "@emailjs/browser";


export const AppointmentForm = () => {
  const [patientId, setPatientId] = useState(0);
  const [doctorId, setDoctorId] = useState(0);
  const [slotId, setSlotId] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/appointment/create`, {
      patient_id:patientId,
      doctor_id:doctorId,
      slot_id:slotId
    }).then((result) => {
      console.log(result);
      const date = moment(result.data.appointment.starttime).format("DD/MM/YYYY");
      const start = moment(result.data.appointment.starttime).format("hh:mm A");
      const end = moment(result.data.appointment.endtime).format("hh:mm A");
      const data = `You have got a new appointment scheduled\n
      ###########################################################################
      The details of the appointment are as follows:
      \tPatient ID: ${result.data.patient.id}
      \tPatient Name: ${result.data.patient.name}\n
      ############################################################################
    \tSlot Details:
      \t\tSlot ID: ${result.data.slot_id}
      \t\tDate: ${date}
      \t\tStart Time: ${start}
      \t\tEnd Time: ${end}\n
    \tThe appoinment is scheduled at your cabin.`;

      var values = {
        doc_email:result.data.doctor.email,
        to_name: result.data.doctor.name,
        subject: "New Appointment Booked",
        data: data
      };
      emailjs.send('', '', values, '').then(
        (result) => {
          console.log(result.text);
          window.alert("Appointment Booked Successfully");
          window.location.reload();
        }
    ).catch((e) => console.log(e));
    }).catch((e) => {
      window.alert(e.response.data.message);
      console.log(e);
    })
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Set Appointment Form</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Patient ID</Form.Label>
                <Form.Control required type="number" placeholder="999" onChange={(e) => setPatientId(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Doctor ID</Form.Label>
                <Form.Control required type="number" placeholder="001" onChange={(e) => setDoctorId(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Slot ID</Form.Label>
                <Form.Control required type="number" placeholder="123" onChange={(e) => setSlotId(e.target.value)} />
              </Form.Group>
            </Col>
            </Row>
            <div className="mt-3">
            <Button variant="primary" type="submit" onClick = {handleSubmit}>Set Appointment</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
