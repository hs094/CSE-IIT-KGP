import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
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
import BgImg from "../../assets/img/bg1.jpg";
import { FRONTEND_URL, BACKEND_URL } from "../../constants.js";
import axios from "axios";
import AugmentedAxios from "../../utils/augmentedAxios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    return axios
      .post(`${BACKEND_URL}/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("role", JSON.stringify(response.data.role));
        localStorage.setItem("profile", JSON.stringify(response.data.user));
        switch (response.data.role) {
          case "admin":
            window.location.assign(`${FRONTEND_URL}/dashboardadmin`);
            break;
          case "data_entry":
            window.location.assign(`${FRONTEND_URL}/dashboard2`);
            break;
          case "front_desk":
            window.location.assign(`${FRONTEND_URL}/dashboard`);
            break;
          case "doctor":
            window.location.assign(`${FRONTEND_URL}/dashboarddoctor`);
            break;
          default:
            window.location.assign(`${FRONTEND_URL}/`);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          window.alert("Credentials invalid");
        } else if (err.response.status === 404) {
          window.alert("User not found");
        } else {
          window.alert("Server error");
        }
      });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    if (token) {
      AugmentedAxios.get(`${BACKEND_URL}/auth/verify`)
        .then((response) => {
          console.log(response);
          localStorage.setItem("role", JSON.stringify(response.data.role));
          alert("Logged in session found. Redirecting to dashboard...");
          switch (response.data.role) {
            case "admin":
              window.location.assign(`${FRONTEND_URL}/dashboardadmin`);
              break;
            case "data_entry":
              window.location.assign(`${FRONTEND_URL}/dashboard2`);
              break;
            case "front_desk":
              window.location.assign(`${FRONTEND_URL}/dashboard`);
              break;
            case "doctor":
              window.location.assign(`${FRONTEND_URL}/dashboarddoctor`);
              break;
            default:
              window.location.assign(`${FRONTEND_URL}/`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  }, []);

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container style={{ backgroundImage: `url(${BgImage})` }}>
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
          <Row className="justify-content-center form-bg-image">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
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
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
                <br />
                <br />
                <br />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
