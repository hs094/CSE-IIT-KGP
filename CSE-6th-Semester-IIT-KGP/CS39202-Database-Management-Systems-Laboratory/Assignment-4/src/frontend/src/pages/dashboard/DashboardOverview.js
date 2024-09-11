import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartLine,
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";

import { ProfileCardWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { ProfileDetailsWidget } from "../../components/Widgets";
import { useState, useEffect } from "react";
import AugmentedAxios from "../../utils/augmentedAxios";
import { FRONTEND_URL, BACKEND_URL } from "../../constants";

export default () => {
  const [profile, setProfile] = useState({});
  const [role, setRole] = useState("");

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const role = localStorage.getItem("role");
    setRole(role);

    if (!profile) {
      window.alert("Please login first");
      window.location.assign(`${FRONTEND_URL}/sign-in`);
    }
    AugmentedAxios.get(`${BACKEND_URL}/auth/details`)
      .then((response) => {
        setProfile(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <br />
      <h1 className="text-center">Profile Details</h1>
      <br />
      <Row>
        <Col xs={12} xl={6}>
          <ProfileCardWidget profile={profile} role={role} />
        </Col>
        <Col xs={12} xl={6}>
          <ProfileDetailsWidget profile={profile} role={role} />
        </Col>
      </Row>
    </>
  );
};
