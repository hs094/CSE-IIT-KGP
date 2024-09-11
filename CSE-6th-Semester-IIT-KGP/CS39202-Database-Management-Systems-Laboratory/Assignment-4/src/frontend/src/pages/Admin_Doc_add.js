import { DocsignUp } from "../components/doctor_signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faSearch,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import React, { useState } from "react";

export default () => {
  const emptyDoctor = {
    id: -1,
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    license: "",
    specialization: "",
    position: "",
  };
  const [searchId, setSearchId] = useState(1);
  const [doctor, setDoctor] = useState(emptyDoctor);

  const handlesub = (e) => {
    e.preventDefault();
    axios
      .get(`${BACKEND_URL}/doctor/list?id=${searchId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.doctor) {
          setDoctor(res.data.doctor);
        } else {
          alert("No doctor found with this ID");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <h1 className="text-center">Doctor Registration</h1>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Form className="navbar-search">
          <h6>Enter Doctor ID of Doctor to be searched</h6>
          <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="001"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                }}
              />
              <Button
                variant="info"
                className="me-2"
                style={{ color: "white" }}
                onClick={handlesub}
              >
                <span>Search Doctor</span>
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
      <DocsignUp doctor={doctor} />
    </>
  );
};
