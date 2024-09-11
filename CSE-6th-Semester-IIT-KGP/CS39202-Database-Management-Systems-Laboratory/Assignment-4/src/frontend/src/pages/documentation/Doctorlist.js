import React, { Component } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faExternalLinkAlt, faTimesCircle, faCheckCircle, faCalendarAlt, faPhone, faStethoscope,faCodeBranch, faShoppingCart, faCalendar, faFolder, faMapMarkedAlt, faPager, faFileCode, faDownload, faMap, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faBootstrap, faGithub, faJs, faReact, faSass } from "@fortawesome/free-brands-svg-icons";
import { Image, ListGroup, Tooltip, OverlayTrigger, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ReactHero from "../../assets/img/brand/light.svg";
import TopNav from "../../components/top_nav";
import Footer from "../../components/foot";
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
const DoctorCards = (props) => {
    const imgurl = [
        'https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=',
        'https://www.woodlandshospital.in/images/doctor-img/ravi-kant-saraogi.jpg',
        'https://www.practostatic.com/practo-care/doctor_home.png',
        'https://www.felixhospital.com/sites/default/files/2022-11/dr-dk-gupta.jpg',
        'https://shardahospital.org/uploads/doctor/doc_dr-a-k-gadpayle-4.jpg',
        'https://starcare.ae/uploads/doctors/doctor-1672388482.jpg',
        'https://media.istockphoto.com/id/1212177444/photo/happy-male-doctor-of-indian-ethnicity.jpg?b=1&s=170667a&w=0&k=20&c=slxCPqZnDI3HJPRlAGj6VABu9IOG9qMuJvvsTR9WL1I=',
        'https://www.felixhospital.com/sites/default/files/2022-11/dr-priyadarshi-jitendra-kumar.jpg',
        'https://medmonks.com/home/img/doctors/1540540212.jpeg',
        'https://www.time4education.com/engg/Engg-Medical%20images/doctor-male-2.jpg',
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    ]
    const { DoctorList } = props;
    return (
      <>
      <div className="clearfix container">
        <div xs={12} className="text-center d-flex align-items-center justify-content-center">
               <h1>Our Doctors</h1>
        </div>
        <br></br>
        <div className="row">
        {DoctorList.map((data, index) => (
            <div className="col-md-4 animated fadeIn" key={data.id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
                      src={imgurl[index%imgurl.length]}
                      className="card-img-top"
                      alt="doc"
                      style={{height: '300px', width:'320px'}}
                    />
                  </div>
                  <br />
                  <h5 className="card-title">
                    {data.name}
                  </h5>
                  <h6 className="card-title">
                    {data.position + ', ' + data.specialization} 
                  </h6>
                </div>
              </div>
              <br></br>
            </div>
          ))}
              <br></br>
            </div>
        </div>
        <br></br>
        <Row>
        <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
                </Col>
      </Row>
        <br />
      </>
    );
}

export default DoctorCards;
