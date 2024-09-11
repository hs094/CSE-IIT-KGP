import { DocQueForm } from "../components/doctor_appointment_query";
import { AppointmentForm } from "../components/set_appointment";
import { PatientTable, RoomTable, SlotTable, SlotTableDoc } from "../components/Widgets";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import React from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import AugmentedAxios from "../utils/augmentedAxios";
import { useState, useEffect } from "react";
import { OpAddDocSlot } from "../components/Op_add_docslot";

export default () => {
  const [slot, setSlot] = useState([]);

  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/slot/list`)
      .then((res) => {
        setSlot(res.data.slots);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <h1 className="text-center">Manage Appointments</h1>
      <Row>
        <Col xs={12} xl={8}>
          <OpAddDocSlot slot={slot} />
        </Col>
        <Col xs={12} xl={4}>
          <AppointmentForm />
        </Col>
      </Row>
      <Row>
        <Col xs={12} xl={8}>
          <SlotTable slot={slot} />
        </Col>
        <Col xs={12} xl={4}>
          <DocQueForm />
        </Col>
        <br />
      </Row>
    </>
  );
};
