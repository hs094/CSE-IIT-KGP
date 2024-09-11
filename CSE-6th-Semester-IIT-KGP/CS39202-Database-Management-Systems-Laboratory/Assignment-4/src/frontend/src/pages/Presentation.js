import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faExternalLinkAlt, faTimesCircle, faCheckCircle, faCalendarAlt, faStethoscope,faCodeBranch, faShoppingCart, faCalendar, faFolder, faMapMarkedAlt, faPager, faFileCode, faDownload, faMap, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faBootstrap, faGithub, faJs, faReact, faSass } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Code from "../components/CodeEditor";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import GitHubButton from 'react-github-btn';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import { Routes } from "../routes";
import MockupPresentation from "../assets/img/hosp/Myproject-1.png";
import ReactHero from "../assets/img/brand/light.svg";
import Logo from "../assets/img/technologies/logo.svg";
import MapboxImg from "../assets/img/mockup-map-presentation.png";
import CalendarImg from "../assets/img/mockup-calendar-presentation.png";
import ReactMockupImg from "../assets/img/hosp/BeFunky-collage.png";
import BS5IllustrationsImg from "../assets/img/illustrations/bs5-illustrations.svg";
import BS5Logo from "../assets/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "../assets/img/technologies/react-logo.svg";
import DocsBuild from "./documentation/Doctors";

import pages from "../data/pages";
import features from "../data/features";

export default () => {
  const PagePreview = (props) => {
    const { name, image, link } = props;

    return (
      <Col xs={6} className="mb-5">
        <Card.Link as={Link} to={link} className="page-preview page-preview-lg scale-up-hover-2">
          <Image src={image} className="shadow-lg rounded scale" alt="Dashboard page preview" />

          <div className="text-center show-on-hover">
            <h6 className="m-0 text-center text-white">
              {name} <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2" />
            </h6>
          </div>
        </Card.Link>
      </Col>
    );
  };

  const Feature = (props) => {
    const { title, description, icon } = props;

    return (
      <Col xs={12} sm={6} lg={3}>
        <Card className="bg-white shadow-soft text-primary rounded mb-4">
          <div className="px-3 px-lg-4 py-5 text-center">
            <span className="icon icon-lg mb-4">
              <FontAwesomeIcon icon={icon} />
            </span>
            <h5 className="fw-bold text-primary">{title}</h5>
            <p>{description}</p>
          </div>
        </Card>
      </Col>
    );
  };

  const FolderItem = (props) => {
    const { name, icon, tooltip, iconColor } = props;
    const color = iconColor ? `text-${iconColor}` : "";

    return (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="left"
        overlay={<Tooltip>{tooltip}</Tooltip>}
      >
        <li data-toggle="tooltip" data-placement="left" title="Main folder that you will be working with">
          <FontAwesomeIcon icon={icon ? icon : faFolder} className={`${color} me-2`} /> {name}
        </li>
      </OverlayTrigger>
    );
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" bg="dark" className="navbar-transparent navbar-theme-primary sticky-top">
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand as={HashLink} to="#home" className="me-lg-3 d-flex align-items-center">
          <FontAwesomeIcon icon={faStethoscope} className="ms-2" />
            <span className="ms-2 brand-text d-none d-md-inline">Global Hospitals</span>
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Navbar.Collapse id="navbar-default-primary">
              <Nav className="navbar-nav-hover align-items-lg-center">
                <Nav.Link as={HashLink} to="#gallery">Gallery</Nav.Link>
                <Nav.Link as={HashLink} to="#services" className="d-sm-none d-xl-inline">Services Offered</Nav.Link>
                <Nav.Link as={HashLink} to="#ourdoctors">Our Doctors</Nav.Link>
                {/* <Nav.Link>
                    <Button href="https://demo.themesberg.com/volt-pro-react/#/" target="_blank" variant="secondary" className="m-0 mt-2">Demo Volt React Pro <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Button>
                </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
            <i className="phone-icon" style={{color: "cyan"}}><FontAwesomeIcon icon={faPhone} />1800-8908-789</i>
          </div>
        </Container>
      </Navbar>
      <section className="section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 bg-primary text-white" id="home">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <div className="react-big-icon d-none d-lg-block"><span className="fab fa-react"></span></div>
              <h1 className="fw-bolder text-secondary">Global Hospitals</h1>
              <p className="text-muted fw-light mb-5 h5">Touching lives, one patient at a time. Because Your Life Matters. Fast, friendly and accurate care for you.</p>
            </Col>
          </Row>
          <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block mb-n2">
            <svg className="fill-soft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 185.4">
              <path d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z" />
            </svg>
          </figure>
        </Container>
      </section>
      <div className="section pt-0">
        <Container className="mt-n10 mt-lg-n12 z-2">
          <Row className="justify-content-center">
            <Col xs={12}>
              <Image src={MockupPresentation} alt="Mockup presentation" />
            </Col>
          </Row>
          <Row className="justify-content-center mt-5 mt-lg-6">
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faMap} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">10</h3>
              <p className="text-gray">Countries</p>
            </Col>
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">100+</h3>
              <p className="text-gray">Cities</p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faStethoscope} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">Cure with Care</h3>
              <p className="text-gray">World-Class Facilies and Acolated Doctors</p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon color="secondary" icon={faCalendarAlt} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">24 x 7</h3>
              <p className="text-gray">ICU, Cardiac Care Unit, NICU Photo-therapy, Incubators Etc. & a host of other facilities & amenities</p>
            </Col>
          </Row>
        </Container>
      </div>
      <section className="section section-md bg-soft pt-lg-3" id="gallery">
        <Container>
          <Row className="justify-content-between align-items-center mb-5 mb-lg-7">
            <Col lg={5} className="order-lg-2 mb-5 mb-lg-0">
              <h2>We are Covid Safe</h2>
              <p className="mb-3 lead fw-bold">While these challenging times have brought many changes, at Global Hospitals one thing remained the same</p>
              <p className="mb-4"> Our commitment to the safety of our patients, their loved ones and our staff. We have established a safe environment and were among the first in the country to implement a range of rigorous protocol</p>
            </Col>
            <Col lg={6} className="order-lg-1">
              <Image src={ReactMockupImg} alt="Calendar Preview" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-lg bg-primary text-white" id="services">
        <Container>
          <Row className="justify-content-center mb-5 mb-lg-6">
            <Col xs={12} className="text-center">
              <h2 className="px-lg-5">Services Offered</h2>
              <p className="lead px-lg-8">The Global Hospitals are regarded as one of the best heart hospitals in India, performing a multitude of treatments and procedures in cardiology and cardiothoracic surgery. The scorecard shows an unmatched record of over 1,52,000 cardiac and cardiothoracic surgeries. We have over 4 Lakh Permanent Registered Patients and served over a million people round the globe.</p>
            </Col>
          </Row>
          <Row>
            {features.map(feature => <Feature key={`features-${feature.id}`} {...feature} />)}
          </Row>
        </Container>
      </section>
      {/* <section className="section section-lg line-bottom-soft">
        <Container>
          <Row className="justify-content-center mb-5 mb-lg-6">
            <Col xs={12} className="text-center">
              <h2 className="px-lg-5">What's inside?</h2>
              <p className="lead px-lg-8">We have carefully crafted the perfect folder structure to ensure that finding the files you're looking for are easily reachable and well organized.</p>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={6} className="mb-4">
              <div className="d-none d-lg-block mt-5">
                <h4>The perfect folder structure for your project</h4>
                <p className="lead mb-4">The folder structure is based on the popular <code>create-react-app</code> repository using Sass source files for CSS preprocessing.</p>
                <Button as={Link} variant="secondary" size="md" to={Routes.DocsFolderStructure.path} target="_blank" className="text-dark">
                  <FontAwesomeIcon icon={faCodeBranch} className="me-2" /> Folder Structure
                </Button>
              </div>
            </Col>
            <Col xs={12} lg={6} className="order-lg-first d-flex justify-content-center">
              <ListGroup className="d-block fmw-100 list-style-none folder-structure">
                <FolderItem name="src" tooltip="Main folder that you will be working with" />

                <ListGroup className="list-style-none ps-4">
                  <FolderItem name="assets" tooltip="CSS, Images, Fonts and Javascript" />
                  <FolderItem name="components" tooltip="Custom React.js components on top of react-bootstrap" />
                  <FolderItem name="data" tooltip="Data source for the dashboard and components" />
                  <FolderItem name="pages" tooltip="React.js admin dashboard pages" />
                  <FolderItem name="scss" tooltip="Sass source files" />
                  <FolderItem name="index.js" tooltip="Main React.js file that wraps the project" icon={faJs} iconColor="secondary" />
                  <FolderItem name="routes.js" tooltip="The file where the routes are registered at" icon={faJs} iconColor="secondary" />
                </ListGroup>

                <FolderItem name="build" tooltip="The production build of the project" />
                <FolderItem name="node_modules" tooltip="Project dependencies from package.json" />

                <FolderItem name="package.json" tooltip="Project details and dependencies." icon={faFileCode} iconColor="tertiary" />
                <FolderItem name="README.md" tooltip="No project can miss a README :)" icon={faFileCode} iconColor="tertiary" />
                <FolderItem name=".gitignore" tooltip="This file ensures that generated files and folder are ignored by Git. (eg. node_modules)" icon={faFileCode} iconColor="tertiary" />
              </ListGroup>
            </Col>
            <Col xs={12} className="mt-5 d-lg-none">
              <h5>The perfect folder structure for your project</h5>
              <p className="lead mb-4">The folder structure is based on the popular <code>create-react-app</code> repository using Sass source files for CSS preprocessing.</p>
            </Col>
          </Row>
        </Container>
      </section> */}
      <section className="section section-lg bg-primary" id="ourdoctors">
        <Container>
          <Row className="justify-content-center text-center text-white mb-5">
            <Col xs={12}>
              <h2 className="fw-light mb-3">
                Our <span className="fw-bold">Doctors</span>
              </h2>
              <p className="lead px-lg-4">
              Our team of doctors is dedicated to providing high-quality healthcare to all our patients. We understand that each patient is unique and requires personalized care, which is why we take the time to listen to your concerns and develop a treatment plan that is tailored to your individual needs.
              </p>
            </Col>
            <div className="d-flex align-items-center justify-content-center">
                <Button variant="secondary" as={Link} to={Routes.DocsBuild.path} className="text-dark me-3">
                Know More <FontAwesomeIcon icon={faExternalLinkAlt} className="d-none d-sm-inline ms-1" />
                </Button>
              </div>
          </Row>
          
        </Container>
      </section>
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
    </>
  );
};
