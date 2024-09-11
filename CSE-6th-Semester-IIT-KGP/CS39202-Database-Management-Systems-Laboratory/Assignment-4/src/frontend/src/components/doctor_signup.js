import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";

export const DocsignUp = (props) => {
  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [licence, setLicence] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [position, setPosition] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/doctor/register`, {
      email: email,
      password: password,
      name: name,
      address: address,
      phone: phone,
      license: licence,
      specialization: specialization,
      position: position,
    })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Doctor Registered Successfully");
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Doctor Registration</h5>
        <Form>
          <Row>
            <Col md={8} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Doctor Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                  defaultValue={props.doctor.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="age">
                <Form.Label>Doctor ID</Form.Label>
                <small style={{ color: "red", fontWeight: "bold" }}>
                  &nbsp;(Ignore For New Registrations)
                </small>
                <Form.Control
                  required
                  type="number"
                  placeholder="35"
                  defaultValue={props.doctor.id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={4} className="mb-3">
              <Form.Group id="age">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="abc@abc.com"
                  defaultValue={props.doctor.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+91 12345 67890"
                  defaultValue={props.doctor.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="age">
                <Form.Label>Licence No.</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={props.doctor.license}
                  onChange={(e) => setLicence(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={props.doctor.specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={props.doctor.position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  type="text"
                  placeholder="Enter address of the Doctor"
                  defaultValue={props.doctor.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <span>
              <Button variant="primary" type="submit" onClick={handleRegister}>
                Register
              </Button>
            </span>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
