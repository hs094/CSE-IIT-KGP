import React, { useState } from "react";
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

export default () => {
  const [num, setNum] = useState(0);
  const [type, setType] = useState("");
  const [bid, setBid] = useState(0);
  const [cost, setCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/room/add`, {
      room_number: num,
      type: type,
      cost: cost,
      block_id: bid,
    })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Room Added Successfully");
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
        <h1 className="text-center">Add Rooms</h1>
        <h5 className="mb-4">Add Room Details</h5>
        <Form>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="room">
                <Form.Label>Room No.</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="35"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="type">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="ICU"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="bid">
                <Form.Label>Block ID</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="35"
                  value={bid}
                  onChange={(e) => setBid(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="cost">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="10000"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <span>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Add
              </Button>
            </span>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
