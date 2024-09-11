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

export default () => {
  return (
    <main>
      <TopNav />
      <section className="align-items-center justify-content-center container">
      <Row>
        <Col xs={12} className="p-3"> 
          <Card>
            <Card.Body>
              <article>
                <h1 className="h1 text-center" id="overview">
                  About Us{" "}
                </h1>
                <p className="fs-5" style = {{color: "Blue", fontWeight: "bold"}}>GLOBAL HOSPITALS</p>
                <p>Provides best quality healthcare for you</p>
                <p>
                  Global Hospitals Enterprise Limited is an Indian multinational
                  healthcare group headquartered in Chennai. Along with the
                  eponymous hospital chain, the company also operates
                  pharmacies, primary care and diagnostic centres, telehealth
                  clinics, and digital healthcare services among others through
                  its subsidiaries.
                </p>
                <p>
                  The company was founded by Prathap C. Reddy in 1983 as the
                  first corporate healthcare provider in India. Several of
                  Global's hospitals have been among the first in India to
                  receive international healthcare accreditation by the
                  America-based Joint Commission International (JCI) as well as
                  NABH accreditation.
                </p>
                <br></br>
                <h2>Subsidiaries</h2>
                <h4>Global HealthCo</h4>
                <p>
                  Global HealthCo was formed in 2021 with the merger of the
                  group's non-hospital pharmacy chain Global Pharmacy and its
                  digital healthcare business known as Global 24/7.
                </p>
                <ul>
                  <li>
                    <p>
                      <b>Global Pharmacy</b> - Global Pharmacy is the largest
                      retail pharmacy chain in India with more than 4000 outlets
                      in over 21 states. It was started in 1987.
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Global 24/7</b> - Global 24/7 is the digital healthcare
                      platform of the group which was launched in 2020. It
                      offers telehealth consultation, online medicine ordering
                      and delivery, and in-home diagnostics among other
                      services.
                    </p>
                  </li>
                </ul>
                <h4>Global Health and Lifestyle</h4>
                <p>
                  Global Health and Lifestyle is the primary care arm of the
                  group which operates multi-specialty clinics under Global
                  Clinics, diagnostics and pathology labs under Global
                  Diagnostics, diabetes clinics under Global Sugar, dental
                  hospitals under Global White, dialysis centres under Global
                  Dialysis, surgical hospitals under Global Spectra,
                  women/children hospitals under Global Cradle, and fertility
                  clinics under Global Fertility.
                </p>
                <h4>Global TeleHealth Services</h4>
                <p>
                  Global TeleHealth Services owns the telehealth network of the
                  group, operating via a business-to-consumer model under which
                  it offers direct services like online consultations,
                  appointment booking, medicine delivery, among others; a
                  business-to-business offering to corporates for their
                  employees; and a business-to-government agreement providing
                  telehealth services in partnership with public health systems.
                  Established in 1999, it is headquartered in Hyderabad and has
                  more than 100 franchised teleclinics.
                </p>
                <h4>Research and education divisions</h4>
                <p>
                  A postal stamp issued in 2019 commemorating Global's Centre of
                  Cardiology.
                </p>
                <p>
                  Global Research and Innovations is a research arm of the group
                  which is involved in clinical trials of drugs, medical
                  devices, healthcare software and consumer products. It was
                  established in 2000 and has 17 centres at hospital locations.
                </p>
                <p>
                  Global Hospitals Education & Research Foundation is a
                  non-profit which conducts research projects at its wet lab run
                  by the Cell and Molecular Biology Research Centre (CMBRC) in
                  liquid biopsy, molecular diagnostics, pharmacogenomics and
                  exosome technologies.
                </p>
                <p>
                  Global Medskills is a private-public partnership between
                  Global Hospitals and National Skill Development Corporation
                  started in 2012 for the development of medical skills of
                  healthcare workforce through 40+ training institutes across
                  the country.
                </p>
                <br></br>
                
              </article>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
        </Col>
      </Row>
      <br />
      </section>
      <Footer />
    </main>
  );
};
