import { DocAddSlot } from "../components/Doc_add_slot";
import { SlotTableDoc } from "../components/Widgets";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import AugmentedAxios from "../utils/augmentedAxios";

export default () => {
  const [slot, setSlot] = useState([]);
  useEffect(() => {
    const docId = JSON.parse(localStorage.getItem("profile")).id;
    AugmentedAxios.get(`${BACKEND_URL}/slot/list?doctor_id=${docId}`).then(
      (res) => {
        setSlot(res.data.slots);
      }
    );
  }, []);
  return (
    <>
      <Row>
        <Col xs={12} xl={12}>
          <DocAddSlot />
        </Col>
        <Col xs={12} xl={12}>
          <SlotTableDoc slot={slot} />
        </Col>
      </Row>
    </>
  );
};
