import DoctorCards from './Doctorlist.js'
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../constants.js";
import axios from "axios";
import TopNav from '../../components/top_nav.js';
import Footer from '../../components/foot.js';

export default () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/doctor/list`).then((res) => {
      setDoctors(res.data.doctors);
    });
  }, []);

  return (
    <>
    <TopNav />
      <DoctorCards DoctorList={doctors} />
      <Footer />
    </>
  );
};
