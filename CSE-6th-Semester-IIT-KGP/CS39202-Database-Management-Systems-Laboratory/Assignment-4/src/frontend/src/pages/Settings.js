import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faSearch, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button,Form, InputGroup, Dropdown, Modal } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Patient_signup";
import { PageTrafficTable, RankingTable } from "../components/Tables"
import { BACKEND_URL } from "../constants";
import AugmentedAxios from "../utils/augmentedAxios";
import "../components/styles.css";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";


export default () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showDefault, setShowDefault] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState(0);
  const [patient, setPatient] = useState([]);
  const handleClose = () => setShowDefault(false);

  const handlesub = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/patient/getpatient`, {
      id
    })
      .then((response) => {
        if (response.status === 200) {
          setPatient(response.data.patient);
          setShowDefault(true);
        }
      })
      .catch((e) => {
        window.alert(e.response.data.error);
        console.log(e);
      });
    
  }

  return (
    <>
      <h1 className="text-center">Add / Update Patient Details</h1>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <Form className="navbar-search">
        <h6>Enter Patient ID of patient</h6>
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="number" placeholder="999" onChange={(e) => setId(e.target.value)}/>
                  <Button variant="info" className="me-2" style = {{color: "white"}} onClick = {handlesub}>
                  <span>Search Patient</span>
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
      </div>
      <div className="mt-3">
      <span>
              <React.Fragment>
                <Modal as={Modal.Dialog} contentClassName="custom-modal-style" centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                    <h4 className = "text-center" style = {{color: "blue"}}>Patient Details</h4>
                    <h6><b> Name:</b> {patient.name}</h6>
                    <h6><b> Age:</b> {patient.age}</h6>
                    <h6><b> Gender: </b> {patient.gender}</h6>
                    <h6><b> Phone: </b> {patient.phone}</h6>
                    <h6><b> Address: </b> {patient.address}</h6>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" className = "ms-auto" onClick={handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
        </span>
        </div>

      <Row>
        <Col xs={12} xl={12}>
          <GeneralInfoForm />
        </Col>
      </Row>
    </>
  );
};

