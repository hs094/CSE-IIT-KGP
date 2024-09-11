import React, { useState } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


export default () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/procedure/add`, {
      name: name,
      cost: cost,
    })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Procedure Added Successfully");
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h1 className="text-center">Add Procedures</h1>
        <h5 className="mb-4">Add Procedure Details</h5>
        <Form>
          <Row>
            <Col md={8} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Procedure Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter procedure name" onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="cost">
                <Form.Label>Cost</Form.Label>
                <Form.Control required type="number" placeholder="10000" onChange={(e) => setCost(e.target.value)} />
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
