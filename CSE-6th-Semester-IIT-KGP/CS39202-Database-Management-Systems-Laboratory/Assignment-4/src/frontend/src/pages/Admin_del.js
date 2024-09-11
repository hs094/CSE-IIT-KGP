import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BACKEND_URL } from "../constants";
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faSearch, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button,Form, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Patient_signup";
import { PageTrafficTable, RankingTable } from "../components/Tables";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import AugmentedAxios from "../utils/augmentedAxios";


export default () => {
  const [doc_id, SetDoc_id] = useState(0);
  const [op_id, SetOp_id] = useState(0);

  const handleop = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/operator/delete`, {
      id: op_id
    }).then((result) => {
      if(result.status === 200)
      {
        window.alert("Operator Deleted Successfully");
        window.location.reload();
      }
    }).catch((e) => {
      if(e.response.status === 404)
        window.alert("Operator not found");
      else
        console.log(e);
    })
  }

  const handledoc = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/doctor/delete`, {
      id: doc_id
    }).then((result) => {
      if(result.status === 200)
      {
        window.alert("Doctor Deleted Successfully");
        window.location.reload();
      }
    }).catch((e) => {
      if(e.response.status === 404)
        window.alert("Doctor not found");
      else
        console.log(e);
    })
  }

  return (
    <>
      <h1 className="text-center">Remove Stakeholders</h1>
      <Row>
      <Col xs={12} xl={2}>
        </Col>
        <Col xs={12} xl={4}>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <Form className="navbar-search">
        <h6>Enter Doctor ID of Doctor to be Deleted</h6>
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="number" placeholder="999" onChange={(e) => SetDoc_id(e.target.value)}/>
                  <Button variant="danger" className="me-2" style = {{color: "white"}} onClick = {handledoc}>
                  <span>Remove Doctor</span>
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
      </div>
        </Col>
        <Col xs={12} xl={4}>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <Form className="navbar-search">
        <h6>Enter Operator ID of Operator to be Deleted</h6>
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="number" placeholder="999" onChange = {(e) => SetOp_id(e.target.value)}/>
                  <Button variant="danger" className="me-2" style = {{color: "white"}} onClick = {handleop}>
                  <span>Remove Operator</span>
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
      </div>
        </Col>
      </Row>
    </>
  );
};

