import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert, positions, transitions, types } from "react-alert";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faMale,
  faParagraph
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { FRONTEND_URL, BACKEND_URL } from "../../constants.js";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    var values = {
      from_name: name,
      fr_email: email,
      message: message
    };
    emailjs.send('', '', values, '').then( // fill the '' with appropriate credentials
      (result) => {
        console.log(result.text);
        window.alert(
          "Your Query has been recorded. We will get back to you soon.",
        );
        setName('');
        setEmail('');
        setMessage('');
      },
      (error) => {
        console.log(error.text);
        window.alert(
          "We ran into some error, please try again after some time.",
        );
      }
    );

  };
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.Presentation.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              homepage
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Contact Us</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="name" className="mb-4">
                      <Form.Label>Your Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faMale} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="name"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="message" className="mb-4" rows="3">
                      <Form.Label>Your Message</Form.Label>
                      <InputGroup >
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faParagraph} />
                        </InputGroup.Text>
                        <Form.Control
                          as="textarea" rows="5"
                          type="message"
                          placeholder="Message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <br></br>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
