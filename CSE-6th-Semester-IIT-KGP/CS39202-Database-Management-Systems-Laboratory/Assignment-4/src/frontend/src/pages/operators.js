import { OperatorTable, PatientTable, RoomTable } from "../components/Widgets";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";

export default () => {
  const [operators, setOperators] = useState([]);
  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/operator/list`)
      .then((res) => {
        setOperators(res.data.operators);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h1 className="text-center">List of All Operators</h1>
      <OperatorTable operatorList={operators} />
    </>
  );
};
