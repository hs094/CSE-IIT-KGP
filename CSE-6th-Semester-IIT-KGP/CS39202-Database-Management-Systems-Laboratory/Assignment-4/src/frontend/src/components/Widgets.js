import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faChartArea,
  faChartBar,
  faChartLine,
  faFlagUsa,
  faFolderOpen,
  faGlobeEurope,
  faPaperclip,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAngular,
  faBootstrap,
  faReact,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import {
  CircleChart,
  BarChart,
  SalesValueChart,
  SalesValueChartphone,
} from "./Charts";
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEdit,
  faRocket,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  ListGroup,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import ReactPDF from '@react-pdf/renderer';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";

import Profile1 from "../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../assets/img/profile-cover.jpg";

import teamMembers from "../data/teamMembers";
import moment from "moment-timezone";
import InvoicePdf from "./invoicePdf";
import { Route } from "react-router-dom";

export const ProfileCardWidget = (props) => {
  return (
    <Card border="light" className="text-center p-0 mb-4">
      <div
        style={{ backgroundImage: `url(${ProfileCover})` }}
        className="profile-cover rounded-top"
      />
      <Card.Body className="pb-5">
        <Card.Img
          src="https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png"
          alt="profile pic"
          className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
        />
        <Card.Title>{props.profile.name}</Card.Title>
        <Card.Text className="text-gray mb-4">{props.role.slice(1, props.role.length-1)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export const ProfileDetailsWidget = (props) => {
  return (
    <Card border="light" className="text-center p-0 mb-4">
      <div
        style={{ backgroundImage: `url(${ProfileCover})` }}
        className="profile-cover rounded-top"
      />
      <Card.Body className="pb-5">
        <Card.Title>Personal Details: </Card.Title>
        <Card.Subtitle className="text-gray mb-4">
          {props.profile.id}
        </Card.Subtitle>
        <Card.Subtitle className="text-gray mb-4">
          {props.profile.address}
        </Card.Subtitle>
        {props.role === "admin" && (
          <Card.Subtitle className="text-gray mb-4">
            Phone: {props.profile.phone}
          </Card.Subtitle>
        )}
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = (props) => {
  const { discharged } = props;
  let date1, date2;
  const TableRow = (props) => {
    const date = moment(props.starttime).format("DD/MM/YYYY");
    const start = moment(props.starttime).format("hh:mm:ss A");
    const edate = moment(props.endtime).format("DD/MM/YYYY");
    const end = moment(props.endtime).format("hh:mm:ss A");
    return (
      <tr>
        <td>
          <span className="fw-normal">{props.patient_id}</span>
        </td>
        <td>
          <span className="fw-normal">{props.name}</span>
        </td>
        <td>
          <span className="fw-normal">{start}, {date}</span>
        </td>
        <td>
          <span className="fw-normal">{end}, {edate}</span>
        </td>
        <td>
          <span className="fw-normal">{props.phone}</span>
        </td>
        <td>
          <Button
            as={Link}
            to = {`/get/invoice/${props.id}`}
            variant=""
            className="fw-normal"
          >
            <FontAwesomeIcon icon={faDownload} className="me-1" />
            Download
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <h3 className="text-center"> Discharged Patient List </h3>
      <Card
        border="light"
        className="table-wrapper table-responsive shadow-sm"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Patient ID</th>
                <th className="border-bottom">Patient Name</th>
                <th className="border-bottom">Admit Date</th>
                <th className="border-bottom">Discharge Date</th>
                <th className="border-bottom">Phone</th>
                <th className="border-bottom">Download Invoice</th>
              </tr>
            </thead>
            <tbody>
              {discharged.map((t) => (
                <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const PatientTableForDoc = (props) => {
  const TableRow = (props) => {
    const date = moment(props.date).format("DD/MM/YYYY");
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6 text-center">{props.patient_id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="border-0">
          <div>
            <span className="h6 text-center">{props.id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.illness_details}</td>
        <td className="fw-bold border-0">{props.procedure_name}</td>
        <td className="fw-bold border-0">{date}</td>
        <td className="fw-bold border-0">{props.room}</td>
      </tr>
    );
  };

  const { patients } = props;
  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "50vh" }}
    >
      <br />
      <h5 className="text-center"> Patients List </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Patient ID</th>
              <th className="border-0">Patient Name</th>
              <th className="border-0">Treatment ID</th>
              <th className="border-0">Illness Details</th>
              <th className="border-0">Procedure Name</th>
              <th className="border-0">Treatment Date</th>
              <th className="border-0">Room Number</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const PatientTableForAppointDoc = (props) => {
  const TableRow = (props) => {
    const date = moment(props.starttime).format("DD/MM/YYYY");
    const start = moment(props.starttime).format("hh:mm A");
    const end = moment(props.endtime).format("hh:mm A");
    const edate = moment(props.endtime).format("DD/MM/YYYY");
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6 ">{props.patient_id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{date}, {start}</td>
        <td className="fw-bold border-0">{edate}, {end}</td>
      </tr>
    );
  };

  const { appointments } = props;

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "50vh" }}
    >
      <br />
      <h5 className="text-center"> Patients List </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Patient ID</th>
              <th className="border-0">Patient Name</th>
              <th className="border-0">Appointment ID</th>
              <th className="border-0">Start Time</th>
              <th className="border-0">End Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const AllTests = (props) => {
  const { tests } = props
  const TableRow = (props) => {
    const date = moment(props.date).format("DD/MM/YYYY");
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6 ">{props.tid}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="border-0">
          <div>
            <span className="h6">{props.appointment_id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.pid}</td>
        <td className="fw-bold border-0">{props.doctor_id}</td>
        <td className="fw-bold border-0">{date}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "80vh" }}
    >
      <br />
      <h5 className="text-center"> Patients List </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Test ID</th>
              <th className="border-0">Test Name</th>
              <th className="border-0">Appointment ID</th>
              <th className="border-0">Patient ID</th>
              <th className="border-0">Doctor ID</th>
              <th className="border-0">Date</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const MedicationList = (props) => {
  const { AllMedicationList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="border-0">
          <div>
            <span className="h6">{props.brand}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.description}</td>
        <td className="fw-bold border-0">{props.cost}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "60vh" }}
    >
      <br />
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Medication ID</th>
              <th className="border-0">Medication Name</th>
              <th className="border-0">Description</th>
              <th className="border-0">Brand</th>
              <th className="border-0">Cost</th>
            </tr>
          </thead>
          <tbody>
            {AllMedicationList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const PatientMedicationList = (props) => {
  const { PatientMedicationList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="fw-bold border-0">{props.brand}</td>
        <td className="border-0">
          <div>
            <span className="h6">{props.dose_amount}</span>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "40vh" }}
    >
      <br />
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Medication ID</th>
              <th className="border-0">Medication Name</th>
              <th className="border-0">Medication Brand</th>
              <th className="border-0">Dose Amount</th>
            </tr>
          </thead>
          <tbody>
            {PatientMedicationList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const PatientTable = (props) => {
  const { AllPatientList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="fw-bold border-0">{props.gender}</td>
        <td className="fw-bold border-0">{props.age}</td>
        <td className="fw-bold border-0">{props.phone}</td>
        <td className="fw-bold border-0">{props.address}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "42.5vh" }}
    >
      <br />
      <h5 className="text-center"> Patients List </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Patient ID</th>
              <th className="border-0">Patient Name</th>
              <th className="border-0">Gender</th>
              <th className="border-0">Age</th>
              <th className="border-0">Phone</th>
              <th className="border-0">Address</th>
            </tr>
          </thead>
          <tbody>
            {AllPatientList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const AdmittedPatientTable = (props) => {
  const { patientList } = props;
  const TableRow = (props) => {
    const date = moment(props.starttime).format("DD/MM/YYYY");
    const start = moment(props.starttime).format("hh:mm A");
    const end = moment(props.endtime).format("hh:mm A");
    const edate = moment(props.endtime).format("DD/MM/YYYY");
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="fw-bold border-0">{date}, {start}</td>
        <td className="fw-bold border-0">{props.endtime ? <span>{edate}, {end}</span> : <span style = {{color: "green"}}>Not Yet Discharged</span> }</td>
        <td className="fw-bold border-0">{props.stay_id}</td>
        <td className="fw-bold border-0">{props.room}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "85vh" }}
    >
      <br />
      <h5 className="text-center"> Patients List </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0"> ID</th>
              <th className="border-0"> Name</th>
              <th className="border-0">Admission Date</th>
              <th className="border-0">Discharge Date</th>
              <th className="border-0">Stay ID</th>
              <th className="border-0">Room Number</th>
            </tr>
          </thead>
          <tbody>
            {patientList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const DoctorTable = (props) => {
  const { doctorList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="fw-bold border-0">{props.specialization}</td>
        <td className="fw-bold border-0">{props.position}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "80vh" }}
    >
      <br />
      <h5 className="text-center"> Doctors List </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Doctor ID</th>
              <th className="border-0">Doctor Name</th>
              <th className="border-0">Specialization</th>
              <th className="border-0">Position</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const OperatorTable = (props) => {
  const { operatorList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.name}</td>
        <td className="fw-bold border-0">{props.role}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "80vh" }}
    >
      <br />
      <h5 className="text-center"> Operators List </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Operator Emp ID</th>
              <th className="border-0">Operator Name</th>
              <th className="border-0">Operator Role</th>
            </tr>
          </thead>
          <tbody>
            {operatorList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const AllRoomTable = (props) => {
  const { AllRoomList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.room_number}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.type}</td>
        <td className="fw-bold border-0">{props.cost}</td>
        <td className="fw-bold border-0">
          {props.available ? (
            <span style={{ color: "green" }}>Available</span>
          ) : (
            <span style={{ color: "red" }}>Booked</span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "42.5vh" }}
    >
      <br />
      <h5 className="text-center">All Rooms </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Room Number</th>
              <th className="border-0">Room Type</th>
              <th className="border-0">Cost</th>
              <th className="border-0">Availability</th>
            </tr>
          </thead>
          <tbody>
            {AllRoomList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RoomTable = (props) => {
  const { AvlRoomList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.room_number}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.type}</td>
        <td className="fw-bold border-0">{props.cost}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "42.5vh" }}
    >
      <br />
      <h5 className="text-center">Available Rooms </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Room Number</th>
              <th className="border-0">Room Type</th>
              <th className="border-0">Cost</th>
            </tr>
          </thead>
          <tbody>
            {AvlRoomList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const BlockTable = (props) => {
  const { BlockList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="fw-bold border-0">{props.id}</td>
        <td className="border-0">
          <div>
            <span className="h6">{props.floor}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.code}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "42.5vh" }}
    >
      <br />
      <h5 className="text-center">All Blocks </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Block ID</th>
              <th className="border-0">Block Floor</th>
              <th className="border-0">Block Code</th>
            </tr>
          </thead>
          <tbody>
            {BlockList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const ProcedureTable = (props) => {
  const { ProcedureList } = props;
  const TableRow = (props) => {
    return (
      <tr>
        <td className="fw-bold border-0">{props.id}</td>
        <td className="border-0">
          <div>
            <span className="h6">{props.name}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.cost}</td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "42.5vh" }}
    >
      <br />
      <h5 className="text-center">All Procedures </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Procedure ID</th>
              <th className="border-0">Procedure Name</th>
              <th className="border-0">Procedure Cost</th>
            </tr>
          </thead>
          <tbody>
            {ProcedureList.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const SlotTable = (props) => {
  const TableRow = (props) => {
    const date = moment(props.starttime).format("DD/MM/YYYY");
    const start = moment(props.starttime).format("hh:mm A");
    const end = moment(props.endtime).format("hh:mm A");
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="border-0">
          <div>
            <span className="h6">{props.doctor_id}</span>
          </div>
        </td>
        <td className="border-0">
          <div>
            <span className="h6">{date}</span>
          </div>
        </td>
        <td className="border-0">
          <div>
            <span className="h6">{start}</span>
          </div>
        </td>
        <td className="border-0">
          <div>
            <span className="h6">{end}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.status ? (
            <span style={{ color: "green" }}>Available</span>
          ) : (
            <span style={{ color: "red" }}>Booked</span>
          )}</td>
      </tr>
    );
  };

  const { slot } = props;

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "42.5vh" }}
    >
      <br />
      <h5 className="text-center"> Available Slots </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Slot ID</th>
              <th className="border-0">Doctor ID</th>
              <th className="border-0">Date</th>
              <th className="border-0">Start Time</th>
              <th className="border-0">End Time</th>
              <th className="border-0">Status</th>
            </tr>
          </thead>
          <tbody>
            {slot.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const SlotTableDoc = (props) => {
  const TableRow = (props) => {
    const date = moment(props.starttime).format("DD/MM/YYYY");
    const start = moment(props.starttime).format("hh:mm A");
    const end = moment(props.endtime).format("hh:mm A");
    return (
      <tr>
        <td className="border-0">
          <div>
            <span className="h6">{props.id}</span>
          </div>
        </td>
        <td className="border-0">
          <div>
            <span className="h6">{date}</span>
          </div>
        </td>
        <td className="border-0">
          <div>
            <span className="h6">{start}</span>
          </div>
        </td>
        <td className="border-0">
          <div>
            <span className="h6">{end}</span>
          </div>
        </td>
        <td className="fw-bold border-0">{props.status ? (
            <span style={{ color: "green" }}>Available</span>
          ) : (
            <span style={{ color: "red" }}>Booked</span>
          )}</td>
      </tr>
    );
  };

  const { slot } = props;

  return (
    <Card
      border="light"
      className="shadow-sm"
      style={{ overflowY: "scroll", height: "42.5vh" }}
    >
      <br />
      <h5 className="text-center"> Available Slots </h5>
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Slot ID</th>
              <th className="border-0">Date</th>
              <th className="border-0">Start Time</th>
              <th className="border-0">End Time</th>
              <th className="border-0">Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {slot.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const ChoosePhotoWidget = (props) => {
  const { title, photo } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={photo} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose Image</div>
                  <div className="text-gray small">
                    JPG, GIF or PNG. Max size of 800K
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const CounterWidget = (props) => {
  const { icon, iconColor, category, title, period, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <div
              className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="d-sm-none">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
            <small>
              {period}, <FontAwesomeIcon icon={faGlobeEurope} size="xs" />{" "}
              WorldWide
            </small>
            <div className="small mt-2">
              <FontAwesomeIcon
                icon={percentageIcon}
                className={`${percentageColor} me-1`}
              />
              <span className={`${percentageColor} fw-bold`}>
                {percentage}%
              </span>{" "}
              Since last month
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const CircleChartWidget = (props) => {
  const { title, data = [] } = props;
  const series = data.map((d) => d.value);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xs={12}
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map((d) => (
              <h6
                key={`circle-element-${d.id}`}
                className="fw-normal text-gray"
              >
                <FontAwesomeIcon
                  icon={d.icon}
                  className={`icon icon-xs text-${d.color} w-20 me-1`}
                />
                {` ${d.label} `}
                {`${d.value}%`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const BarChartWidget = (props) => {
  const { title, value, percentage, data = [] } = props;
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const series = data.map((d) => d.value);
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <h6 className="fw-normal text-gray mb-2">{title}</h6>
          <h3>{value}</h3>
          <small className="mt-2">
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={`${percentageColor} fw-bold`}>{percentage}%</span>
          </small>
        </div>
        <div className="d-block ms-auto">
          {data.map((d) => (
            <div
              key={`bar-element-${d.id}`}
              className="d-flex align-items-center text-end mb-2"
            >
              <span className={`shape-xs rounded-circle bg-${d.color} me-2`} />
              <small className="fw-normal">{d.label}</small>
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Body className="p-2">
        <BarChart labels={labels} series={series} />
      </Card.Body>
    </Card>
  );
};

export const TeamMembersWidget = () => {
  const TeamMember = (props) => {
    const { name, statusKey, image, icon, btnText } = props;
    const status = {
      online: { color: "success", label: "Online" },
      inMeeting: { color: "warning", label: "In a meeting" },
      offline: { color: "danger", label: "Offline" },
    };

    const statusColor = status[statusKey] ? status[statusKey].color : "danger",
      statusLabel = status[statusKey] ? status[statusKey].label : "Offline";

    return (
      <ListGroup.Item className="px-0">
        <Row className="align-items-center">
          <Col className="col-auto">
            <a href="#top" className="user-avatar">
              <Image src={image} className="rounded-circle" />
            </a>
          </Col>
          <Col className="ms--2">
            <h4 className="h6 mb-0">
              <a href="#!">{name}</a>
            </h4>
            <span className={`text-${statusColor}`}>● </span>
            <small>{statusLabel}</small>
          </Col>
          <Col className="col-auto">
            <Button variant="tertiary" size="sm">
              <FontAwesomeIcon icon={icon} className="me-1" /> {btnText}
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light d-flex justify-content-between">
        <h5 className="mb-0">Team members</h5>
        <Button variant="secondary" size="sm">
          See all
        </Button>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush list my--3">
          {teamMembers.map((tm) => (
            <TeamMember key={`team-member-${tm.id}`} {...tm} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export const ProgressTrackWidget = () => {
  const Progress = (props) => {
    const { title, percentage, icon, color, last = false } = props;
    const extraClassName = last ? "" : "mb-2";

    return (
      <Row className={`align-items-center ${extraClassName}`}>
        <Col xs="auto">
          <span className={`icon icon-md text-${color}`}>
            <FontAwesomeIcon icon={icon} className="me-1" />
          </span>
        </Col>
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{title}</h6>
              <small className="fw-bold text-dark">
                <span>{percentage} %</span>
              </small>
            </div>
            <ProgressBar variant={color} now={percentage} min={0} max={100} />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Progress track</h5>
      </Card.Header>
      <Card.Body>
        <Progress
          title="Rocket - SaaS Template"
          color="purple"
          icon={faBootstrap}
          percentage={34}
        />
        <Progress
          title="Pixel - Design System"
          color="danger"
          icon={faAngular}
          percentage={60}
        />
        <Progress
          title="Spaces - Listings Template"
          color="tertiary"
          icon={faVuejs}
          percentage={45}
        />
        <Progress
          title="Stellar - Dashboard"
          color="info"
          icon={faReact}
          percentage={35}
        />
        <Progress
          last
          title="Volt - Dashboard"
          color="purple"
          icon={faBootstrap}
          percentage={34}
        />
      </Card.Body>
    </Card>
  );
};

export const RankingWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faGlobeEurope}
                className="icon icon-xs me-3"
              />{" "}
              Global Rank
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary fw-bold">
              #755 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6 className="mb-0">
              <FontAwesomeIcon icon={faFlagUsa} className="icon icon-xs me-3" />
              Country Rank
            </h6>
            <div className="small card-stats">
              United States{" "}
              <FontAwesomeIcon
                icon={faAngleUp}
                className="icon icon-xs text-success ms-2"
              />
            </div>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #32 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-3">
          <div>
            <h6 className="mb-0">
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="icon icon-xs me-3"
              />
              Category Rank
            </h6>
            <Card.Link href="#top" className="small card-stats">
              Travel &gt; Accomodation
            </Card.Link>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #16 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidget = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">{title}</h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={percentageColor}>{percentage}%</span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">
            Month
          </Button>
          <Button variant="primary" size="sm" className="me-3">
            Week
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChart />
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidgetPhone = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-md-flex flex-row align-items-center flex-0">
        <div className="d-block mb-3 mb-md-0">
          <h5 className="fw-normal mb-2">{title}</h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={percentageColor}>{percentage}%</span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">
            Month
          </Button>
          <Button variant="primary" size="sm" className="me-3">
            Week
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChartphone />
      </Card.Body>
    </Card>
  );
};

export const AcquisitionWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <h5>Acquisition</h5>
        <p>
          Tells you where your visitors originated from, such as search engines,
          social networks or website referrals.
        </p>
        <div className="d-block">
          <div className="d-flex align-items-center pt-3 me-5">
            <div className="icon icon-shape icon-sm icon-shape-danger rounded me-3">
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <div className="d-block">
              <label className="mb-0">Bounce Rate</label>
              <h4 className="mb-0">33.50%</h4>
            </div>
          </div>
          <div className="d-flex align-items-center pt-3">
            <div className="icon icon-shape icon-sm icon-shape-quaternary rounded me-3">
              <FontAwesomeIcon icon={faChartArea} />
            </div>
            <div className="d-block">
              <label className="mb-0">Sessions</label>
              <h4 className="mb-0">9,567</h4>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
