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
              <h1 className="h2 text-center" id="quick-start">History </h1>
              <p className="fs-5 fw-dark">Global Hospitals</p>
              
              <p><b>Global Hospitals</b> was established in 1983 by Dr. Prathap C Reddy, renowned as the architect of modern healthcare in India. As the nation's first corporate hospital, Global Hospitals is acclaimed for pioneering the private healthcare revolution in the country.</p>
              <p>Global Hospitals has emerged as Asia's foremost integrated healthcare services provider and has a robust presence across the healthcare ecosystem, including Hospitals, Pharmacies, Primary Care & Diagnostic Clinics and several retail health models. The Group also has Telemedicine facilities across several countries, Health Insurance Services, Global Projects Consultancy, Medical Colleges, Medvarsity for E-Learning, Colleges of Nursing and Hospital Management and a Research Foundation. </p>
              <p>In addition, 'ASK Global' - an online consultation portal and Global Home Health provide the care continuum.The cornerstones of Global's legacy are its unstinting focus on clinical excellence, affordable costs, modern technology and forward-looking research & academics.</p>
              <p>Global Hospitals was among the first few hospitals in the world to leverage technology to facilitate seamless healthcare delivery. The organization embraced the rapid advancement in medical equipments across the world, and pioneered the introduction of several cutting edge innovations in India. </p>
              <p>Recently, South East Asia's first Proton Therapy Centre commenced operations at the Global Centre in Chennai. Since its inception, Global Hospitals has been honoured by the trust of over 150 million individuals who came from 140 countries. At the core of Global's patient-centric culture is TLC (Tender Loving Care), the magic that inspires hope amongst its patients.</p>
              <p>Dr. Prathap C Reddy, Founder Chairman of the Global Hospitals Group has been conferred with the prestigious Padma Vibhushan, India’s second highest civilian award.
              </p>
              <p>
              <b>Facts & Figures - Global Hospitals</b>
              <table>
              <tr>
              <th>Hospitals</th>	<th>72</th>
              </tr>
              <tr>
              <th>No. of Beds</th>	<th>Over 12000</th>
              </tr>  
              {/* <CommandsTable /> */}
              <tr> <th> No. of Pharmacies</th> <th>	4,500+ </th></tr>
              <tr> <th> No. of Primary Care clinics</th>	<th>Over 120</th></tr>
              <tr> <th>No. of Diagnostic centres</th><th>700+</th></tr>
              <tr> <th>No. of Telemedicine Centres</th>	<th>500+</th></tr>
              <tr> <th>No. of Medical education centres and research foundation</th>	<th>Over 15</th></tr>
              </table>
              </p>
            </article>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
                </Col>
    </Row>
    <br />
  </Container>
  <Footer />
  </>
);
