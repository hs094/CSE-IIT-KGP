import React, { useState } from "react";
// import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {SlotTableDoc} from "./Widgets";
import emailjs from "@emailjs/browser";
import "./styles.css";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  Modal
} from "@themesberg/react-bootstrap";
import AugmentedAxios from "../utils/augmentedAxios";
import { BACKEND_URL } from "../constants";
import moment from "moment";

export const OpAddDocSlot = () => {
  const [date, setDate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const [doctor_id, setDoctor_id] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDefault(true);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setShowDefault(false);
    let start = moment(date).format("YYYY-MM-DD").toString();
    start += `T${starttime}`;

    let end = moment(date).format("YYYY-MM-DD").toString();
    end += `T${endtime}`;
    const op_phone = JSON.parse(localStorage.getItem("profile")).phone;
    const op_name = JSON.parse(localStorage.getItem("profile")).name;
    const op_email = JSON.parse(localStorage.getItem("profile")).email;
    const op_id = JSON.parse(localStorage.getItem("profile")).id;

    AugmentedAxios.post(`${BACKEND_URL}/slot/add`, {
      doctor_id,
      starttime: start,
      endtime: end,
    })
      .then((result) => {
        if (result.status === 200) {
        const date = moment(result.data.slot.starttime).format("DD/MM/YYYY");
        const start = moment(result.data.slot.starttime).format("hh:mm A");
        const end = moment(result.data.slot.endtime).format("hh:mm A");
        const slot_id = result.data.slot.id;
        const data = `A new slot has been created for you\n
      ###########################################################################
      The details of the slot are as follows:
      \t\tSlot ID: ${slot_id}
      \t\tDate: ${date}
      \t\tStart Time: ${start}
      \t\tEnd Time: ${end}\n
      ###########################################################################
    \t Details of the operator (who created the slot):
        \t\t Operator ID: ${op_id}
        \t\t Operator Name: ${op_name}
        \t\t Operator Email: ${op_email}
        \t\t Operator Phone No. : ${op_phone}\n
        In case of any discrepancy or query please contact the operator or the global hospitals team`;
        let values = {
            doc_email:result.data.doctor.email,
            to_name: result.data.doctor.name,
            subject: "New Slot Created",
            data: data
        }
        console.log(result.data);
        emailjs.send('', '', values, '').then(
            (result) => {
              console.log(result.text);
              window.alert("Slot Added Successfully");
              window.location.reload();
            }
        ).catch((e) => console.log(e));
          }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h3 className="text-center">Add Slot (On Emergency Only)</h3>
        <h5 className="mb-4">Add Slot Details</h5>
        <Form>
          <Row>
          <Col md={3} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Doctor ID</Form.Label>
                <Form.Control required type="number" placeholder="999" onChange={(e) => setDoctor_id(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="date">
                <Form.Label>Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={(e) => setDate(e._d)}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          date ? moment(date).format("DD/MM/YYYY") : ""
                        }
                        placeholder="dd/mm/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Start Time</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="time"
                    value={starttime}
                    placeholder="hh:mm"
                    onChange={(e) => {
                      setStarttime(e.target.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="cost">
                <Form.Label>End Time</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="time"
                    value={endtime}
                    placeholder="hh:mm"
                    onChange={(e) => {
                      setEndtime(e.target.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <div className="mt-3">
            <span>
              <React.Fragment>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Add</Button>
                <Modal as={Modal.Dialog} contentClassName="custom-modal-style" centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                    <h5 className = "text-center" style = {{color: "red"}}>Disclaimer</h5>
                    <p>You are adding a new appointment slot which only doctors can add. You are only allowed to do so in case of emergency. Please refrain from adding a new slot if its not an emergency case.
                       <br /> <br />An email will be sent to the doctor about who has set the appointment.<br /> Incase of any discrepancy please contact the hospital authority</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" className = "ms-auto" onClick={handleAdd}>Add Slot</Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
            </span>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
