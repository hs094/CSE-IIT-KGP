import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import AugmentedAxios from "../utils/augmentedAxios";
import { BACKEND_URL } from "../constants.js";

export const AdmitForm = () => {
  const [room, setRoom] = useState(0);
  const [patient_id, setPatient_id] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/stay/create`, {
     patient_id: patient_id,
     room: room
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.alert("Patient Admission details added successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.message);
      });
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Patient Admission Form</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Patient ID</Form.Label>
                <Form.Control required type="number" placeholder="999" onChange={(e) => setPatient_id(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="age">
                <Form.Label>Room Number</Form.Label>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setRoom(e.target.value)} />
              </Form.Group>
            </Col>
            </Row>
            <div className="mt-3">
            <Button variant="primary" type="submit" onClick = {handleSubmit}>Admit Patient</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
