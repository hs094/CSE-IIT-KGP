import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faExternalLinkAlt, faTimesCircle, faCheckCircle, faCalendarAlt, faStethoscope,faCodeBranch, faShoppingCart, faCalendar, faFolder, faMapMarkedAlt, faPager, faFileCode, faDownload, faMap, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faBootstrap, faGithub, faJs, faReact, faSass } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import ReactHero from "../assets/img/brand/light.svg";

import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";

const Footer = () => {
    return ( 
        <footer className="footer py-6 bg-black text-white">
        <Container>
          <Row>
            <Col md={4}>
              <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 mb-3 d-flex align-items-center">
                <Image src={ReactHero} />
                <span className="ms-2 brand-text">Global Hospitals</span>
              </Navbar.Brand>
              <p>Touching lives, one patient at a time. Because Your Life Matters. Fast, friendly and accurate care for you.</p>
              <br />
              <h6>Our Address: </h6>
              C-32 Lane, Amherst Street, Kolkata-700009, West Bengal, India
            </Col>
            <Col xs={6} md={2} className="mb-5 mb-lg-0">
              <span className="h5">Global Hospitals</span>
              <ul className="links-vertical mt-2">
                <Button as={Link} variant="link" className="text-light me-4" to={Routes.AboutUs.path} >
                About Us
                </Button>  
                <Button variant="link" as={Link} to={Routes.ContactUs.path} className="text-light me-4">
                Contact Us
                </Button> 
                <Button variant="link" as={Link} to={Routes.History.path} className="text-light me-4">
                History
                </Button> 
                <Button variant="link" as={Link} to={Routes.Vision.path} className="text-light me-4">
                Vision
                </Button> 
                <Button as={Link} variant="secondary" className="animate-hover btn btn-primary d-inline-flex align-items-center" to={Routes.Signin.path} >
                  <FontAwesomeIcon icon={faArrowAltCircleRight} className="animate-center-3 me-3 ms-2"/>
                  Login
            </Button>
              </ul>
            </Col>
            <Col xs={6} md={2} className="mb-5 mb-lg-0">
              <span className="h5">Important Links</span>
              <ul className="links-vertical mt-2">
                <li><Card.Link target="_blank" href="https://www.icmr.gov.in/">ICMR</Card.Link></li>
                <li><Card.Link target="_blank" href="https://www.aiims.edu/">AIIMS Delhi</Card.Link></li>
                <li><Card.Link target="_blank" href="https://www.who.int/">World Health Organization</Card.Link></li>
                <li><Card.Link target="_blank" href="https://www.mohfw.gov.in/">Health Ministry Of India</Card.Link></li>
              </ul>
            </Col>
            <Col xs={12} md={4} className="mb-5 mb-lg-0">
              <span className="h5 mb-3 d-block">Our Location</span>
              <row>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7381.943179130165!2d87.3061508!3d22.3169142!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d44048085d96d%3A0x44f7d693580b9569!2sDepartment%20of%20Computer%20Science%20%26%20Engineering!5e0!3m2!1sen!2sin!4v1677878473388!5m2!1sen!2sin" width="400" height="250" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </row>
            </Col>
          </Row>
          <hr className="bg-gray my-5" />
          <Row>
            <Col className="mb-md-2">
              <div className="d-flex text-center justify-content-center align-items-center" role="contentinfo">
                <p className="font-weight-normal font-small mb-0">Copyright © Global Hospitals 2022-<span className="current-year">2023</span>. All rights reserved.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
     );
}
 
export default Footer;