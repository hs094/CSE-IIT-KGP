import  { DocAddSlot } from "../components/Doc_add_slot";
import { SlotTableDoc } from "../components/Widgets";
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import React from "react";

export default() => {
    return (
        <>
        <Row>
        <Col xs={12} xl={6}>
          <DocAddSlot/>
        </Col>
        <Col xs = {12} xl={6}>
      < SlotTableDoc />
      </Col>
        </Row>
        </>
    );
};