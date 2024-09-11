import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faExternalLinkAlt, faTimesCircle, faCheckCircle, faCalendarAlt, faStethoscope,faCodeBranch, faShoppingCart, faCalendar, faFolder, faMapMarkedAlt, faPager, faFileCode, faDownload, faMap, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faBootstrap, faGithub, faJs, faReact, faSass } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Routes } from "../routes";

const TopNav = () => {
    return ( 
        <Navbar variant="dark" expand="lg" bg="dark" className="navbar-transparent navbar-theme-primary sticky-top">
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand as={Link} to={Routes.Presentation.path} className="me-lg-3 d-flex align-items-center">
          <FontAwesomeIcon icon={faStethoscope} className="ms-2" />
            <span className="ms-2 brand-text d-none d-md-inline">Global Hospitals</span>
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Navbar.Collapse id="navbar-default-primary">
              <Nav className="navbar-nav-hover align-items-lg-center">
                <Nav.Link as={HashLink} to={Routes.Presentation.path + "#gallery"}>Gallery</Nav.Link>
                <Nav.Link as={HashLink} to={Routes.Presentation.path + "#services"} className="d-sm-none d-xl-inline">Services Offered</Nav.Link>
                <Nav.Link as={HashLink} to={Routes.Presentation.path + "#ourdoctors"}>Our Doctors</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <i className="phone-icon" style={{color: "cyan"}}><FontAwesomeIcon icon={faPhone} />1800-8908-789</i>
          </div>
        </Container>
      </Navbar>
     );
}
 
export default TopNav;