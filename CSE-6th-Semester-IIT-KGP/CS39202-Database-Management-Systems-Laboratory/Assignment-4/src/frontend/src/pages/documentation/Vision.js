import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Container,
} from "@themesberg/react-bootstrap";

import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import TopNav from "../../components/top_nav";
import Footer from "../../components/foot";
export default () => (
  <>
  <TopNav />
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2 text-center" id="license">Vision</h1>
              <p className="fs-5 fw-light">Our Vision</p>
                Apollo's vision for the next phase of development is to ‘Touch a Billion Lives’.
              <br></br>
              <br></br>
              <p className="fs-5 fw-light">Our Mission</p>
              “Our mission is to bring healthcare of International standards within the reach of every individual. We are committed to the achievement and maintenance of excellence in education, research and healthcare for the benefit of humanity”.
              <br></br>
            </article>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
                </Col>
    </Row>
  </Container>
  <br />
  <Footer />
  </>
);
