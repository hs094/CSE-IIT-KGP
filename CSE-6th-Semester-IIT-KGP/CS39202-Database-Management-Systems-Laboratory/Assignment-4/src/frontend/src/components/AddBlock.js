import React, { useState } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';


export default () => {
  const [floor, setFloor] = useState(0);
  const [code, setCode] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/block/add`, {
      floor: floor,
      code: code,
    })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Block Added Successfully");
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
        <h1 className="text-center">Add Blocks</h1>
        <h5 className="mb-4">Add Block Details</h5>
        <Form>
          
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="floor">
                <Form.Label>Floor</Form.Label>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setFloor(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="code">
                <Form.Label>Code</Form.Label>
                <Form.Control required type="number" placeholder="35" onChange={(e) => setCode(e.target.value)} />
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
