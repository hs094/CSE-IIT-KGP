import React, { useState } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


export default () => {
const [id, setId] = useState(0);
const [name, setName] = useState(0);
const [mid, setMid] = useState(0);
const [dose, setDose] = useState(0);
const [tid, setTid] = useState(0);

const handleSubmit = (e) => {
  e.preventDefault();
  AugmentedAxios.post(`${BACKEND_URL}/dose/create`, {
  medication_id: mid,
  dose_amount: dose,
  treatment_id: tid,
  })
    .then((response) => {
      if (response.status === 200) {
        window.alert("Dose for Patient Added Successfully");
        window.location.reload();
      }
    })
    .catch((e) => {
      console.log(e);
      window.alert(e.response.data.message);
    });
}

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h1 className="text-center">Patient Doses</h1>
        <h5 className="mb-4">Add Patient Dosage Details</h5>
        <Form>
          <Row>
            <Col md={8} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="pid">
                <Form.Label>Patient ID</Form.Label>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setId(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={4} className="mb-3">
              <Form.Group id="mid">
                <Form.Label>Medication ID</Form.Label>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setMid(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="dosage">
                <Form.Label>Dosage</Form.Label>
                <Form.Control required type="number" placeholder="6" onChange={(e) => setDose(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="tid">
                <Form.Label>Treatment ID</Form.Label>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setTid(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <span><Button variant="primary" type="submit" onClick = {handleSubmit}>Add</Button>
            </span>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
