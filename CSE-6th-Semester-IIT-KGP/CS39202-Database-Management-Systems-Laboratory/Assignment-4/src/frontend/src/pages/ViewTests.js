import { AllTests } from "../components/Widgets";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import React from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";
import { useState, useEffect } from "react";

export default () => {
    const [tests, setTests] = useState([]);
    useEffect(() => {
      AugmentedAxios.get(`${BACKEND_URL}/test/getalltest`).then((res) => {
        setTests(res.data.tests);
        console.log(res.data);
      });
    }, []);
  
    return (
      <>
        <h1 className="text-center">List of All Tests</h1>
        <AllTests tests={tests} />
      </>
    );
  };
  