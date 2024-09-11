import React, { useState } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


export default () => {
  const [name, setName]= useState("");
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/medication/add`, {
      name: name,
      brand: brand,
      description: desc,
      cost: cost,
    })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Medication Added Successfully");
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
        <h1 className="text-center">Add Medications</h1>
        <h5 className="mb-4">Add Medication Details</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Medication Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter medication name" onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="brand">
                <Form.Label>Medication Brand</Form.Label>
                <Form.Control required type="text" placeholder="Enter medication brand" onChange={(e) => setBrand(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="desc">
                <Form.Label>Description</Form.Label>
                <Form.Control as = "textarea" required type="text" placeholder="Enter medication description" onChange={(e) => setDesc(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="cost">
                <Form.Label>Medication Cost</Form.Label>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setCost(e.target.value)} />
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
