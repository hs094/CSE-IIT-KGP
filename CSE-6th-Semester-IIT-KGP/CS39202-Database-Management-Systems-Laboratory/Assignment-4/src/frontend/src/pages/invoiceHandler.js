import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import AugmentedAxios from "../utils/augmentedAxios";
import InvoicePdf from "../components/invoicePdf.js";

export default () => {
  const [invoice, setInvoice] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    AugmentedAxios.post(`${BACKEND_URL}/invoice/create`, { id }).then((res) => {
      setInvoice(res.data);
    });
  }, []);
  return (
    <>
      <InvoicePdf data = {invoice} />
    </>
  );
};
