import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { TransactionsTable } from "../components/Widgets";
import AugmentedAxios from "../utils/augmentedAxios";

export default () => {
  const [discharged, setDischarged] = useState([]);
  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/stay/getalldischarged`).then((res) => {
      setDischarged(res.data.reverse());
    });
  }, []);
  const [id, setId] = useState(0);
  const handlesub = (e) => {
    e.preventDefault();
    AugmentedAxios.post(`${BACKEND_URL}/stay/discharge`, {
      id: id
    }).then((result) => {
      if(result.status == 200)
      {
        window.alert("Patient Discharged Successfully");
        window.location.reload();
      }
    }).catch((error) => {
      window.alert("No such Patient Found");
      console.log(error);
    })
  }
  return (
    <>
      <h2 className="text-center">Patient Discharge Information</h2>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <p className="mb-0">Enter patient ID of patient to be discharged</p>
          <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="number" placeholder="999" onChange={(e) => setId(e.target.value)}/>
                  <Button variant="info" className="me-2" style = {{color: "white"}} onClick = {handlesub}>
                  <span>Discharge</span>
                  </Button>
                </InputGroup>
              </Form.Group>
          </Form>
        </div>
      </div>

      <TransactionsTable discharged={discharged}/>
    </>
  );
};
