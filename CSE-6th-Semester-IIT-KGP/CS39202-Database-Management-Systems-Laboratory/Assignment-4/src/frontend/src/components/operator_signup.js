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

export const OpsignUp = (props) => {
  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/operator/register`, {
      email: email,
      password: password,
      name: name,
      address: address,
      phone: phone,
      role: role,
    })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Operator Registered Successfully");
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("I am called");
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Operator Registration</h5>
        <Form>
          <Row>
            <Col md={5} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Operator Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={props.operator.name}
                  placeholder="Enter your first name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Operator Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  defaultValue={props.operator.email}
                  placeholder="abc@abc.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="age">
                <Form.Label>Operator ID</Form.Label>
                <small style={{ color: "red", fontWeight: "bold" }}>
                  &nbsp;(Ignore For New Registrations)
                </small>
                <Form.Control required type="number" placeholder="35" />
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
                <Form.Label>Role</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="front_desk / data_entry"
                  defaultValue={props.operator.role}
                  onChange={(e) => setRole(e.target.value)}
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
                  defaultValue={props.operator.phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  placeholder="Enter address of the operator"
                  defaultValue={props.operator.address}
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
