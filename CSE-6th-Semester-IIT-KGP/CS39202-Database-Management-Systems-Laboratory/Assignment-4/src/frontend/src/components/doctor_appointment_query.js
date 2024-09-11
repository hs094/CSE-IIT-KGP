import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup, Modal } from '@themesberg/react-bootstrap';
import AugmentedAxios from "../utils/augmentedAxios";
import './styles.css';
import { BACKEND_URL } from "../constants";
import { SlotTableDoc } from "./Widgets";


export const DocQueForm = () => {
  const [quedate, setQuedate] = useState("");
  const [slotspec, setSlotspec] = useState([]);
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const [doctor_id, setDoctor_id] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    let qdate = moment(quedate).format("YYYY-MM-DD").toString();
    qdate += `T00:00`;
    AugmentedAxios.post(`${BACKEND_URL}/slot/listspec`, {
      doctor_id,
      quedate: qdate,
    })
      .then((response) => {
        if (response.status === 200) {
          setSlotspec(response.data.slots);
          setShowDefault(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Doctor Appointment Query Form</h5>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Doctor ID</Form.Label>
                <Form.Control required type="number" placeholder="1" onChange={(e) => setDoctor_id(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
            <Form.Group id="birthday">
                <Form.Label>Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={(e) => setQuedate(e._d)}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={quedate ? moment(quedate).format("DD/MM/YYYY") : ""}
                        placeholder="dd/mm/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            </Row>
            <div className="mt-3">
            <span>
              <React.Fragment>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Get All Slots</Button>
                <Modal as={Modal.Dialog} contentClassName="custom-modal-style" centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                    <SlotTableDoc slot = {slotspec} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" className = "ms-auto" onClick={handleClose}>Close</Button>
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
