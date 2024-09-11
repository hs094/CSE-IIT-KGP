import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import {
  Col,
  Row,
  Button,
  Form,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Patient_signup";
import { PageTrafficTable, RankingTable } from "../components/Tables";
import AddRoom from "../components/AddRoom";
import AddBlock from "../components/AddBlock";
import { AllRoomTable, BlockTable } from "../components/Widgets";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import AugmentedAxios from "../utils/augmentedAxios";

export default () => {
  const [AllRoom, setRoom] = useState([]);
  const [block, setBlock] = useState([]);
  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/room/list`).then((res) => {
      setRoom(res.data.roomList);
    });
  }, []);

  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/block/list`).then((res) => {
      setBlock(res.data.blocks);
    });
  }, []);

  return (
    <>
      <Row>
        <Col xs={12} xl={6}>
          <AddRoom />
        </Col>
        <Col xs={12} xl={6}>
          <AddBlock />
        </Col>
        <Col xs={12} xl={6}>
          <AllRoomTable AllRoomList={AllRoom} />
        </Col>
        <Col xs={12} xl={6}>
          <BlockTable BlockList={block} />
        </Col>
      </Row>
    </>
  );
};
