import { OpsignUp } from "../components/operator_signup";
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
import React, { useState } from "react";
import AugmentedAxios from "../utils/augmentedAxios";
import { BACKEND_URL } from "../constants";

export default () => {
  const emptyOperator = {
    id: -1,
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    role: "",
  };
  const [searchId, setSearchId] = useState(1);
  const [operator, setOperator] = useState(emptyOperator);

  const handlesub = (e) => {
    e.preventDefault();
    AugmentedAxios.get(`${BACKEND_URL}/operator/list?id=${searchId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.operator) {
          setOperator(res.data.operator);
        } else {
          alert("No operator found with this ID");
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.response.data.message);
      });
  };
  return (
    <>
      <h1 className="text-center">Operator Registration</h1>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Form className="navbar-search">
          <h6>Enter Operator ID of Operator to be searched</h6>
          <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="245"
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
                <span>Search Operator</span>
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
      <OpsignUp operator={operator} />
    </>
  );
};
