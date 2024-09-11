import React, { useState } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


export const GeneralInfoForm = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/patient/create`, {
      name: name,
      address: address,
      gender: gender,
      age: age,
      phone: phone,

    })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Patient Added Successfully");
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Patient Information</h5>
        <Form>
          <Row>
            <Col md={8} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="age">
                <Form.Label>Patient ID</Form.Label>
                <small style={{color: "red", fontWeight: "bold"}}>&nbsp;(Ignore For New Registrations)</small>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setId(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={4} className="mb-3">
              <Form.Group id="age">
                <Form.Label>Age</Form.Label>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setAge(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control required type="text" placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="text" placeholder="+91 12345 67890" onChange={(e) => setPhone(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control as = "textarea" required type="text" placeholder="Enter your home address" onChange={(e) => setAddress(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <span><Button variant="primary" type="submit" onClick = {handleSubmit}>Register</Button>
            </span>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
