import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faSearch, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button,Form, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Patient_signup";
import { PageTrafficTable, RankingTable } from "../components/Tables";
import AddProcedure from "../components/AddProcedure";
import { ProcedureTable } from "../components/Widgets";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import AugmentedAxios from "../utils/augmentedAxios";

export default () => {
  const [procedure, setProcedure] = useState([]);
  useEffect(() => {
    AugmentedAxios.get(`${BACKEND_URL}/procedure/list`).then((res) => {
      setProcedure(res.data.procedures);
      console.log(res.data.procedures);
    }).catch((e) => {console.log(e);});
  }, []);

    return (
        <>  
          <Row>
            <Col xs={12} xl={12}>
              <AddProcedure />
            </Col>
            <Col xs={12} xl={12}>
              <ProcedureTable ProcedureList={procedure} />
            </Col>
          </Row>
        </>
      );
}