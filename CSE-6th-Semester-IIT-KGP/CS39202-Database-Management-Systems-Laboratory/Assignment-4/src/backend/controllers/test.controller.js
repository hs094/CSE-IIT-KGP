import catchAsync from "../utils/catchAsync.js";
import { Appointment, Test } from "../models/index.js";
import { Sequelize } from "sequelize";
import pg from 'pg';
const { Client } = pg;
import loginfo from "../config/pg_details.js";

const createTest = catchAsync(async (req, res) => {
  const { file_url, name, appointment_id, report_status, cost, date } = req.body;

  const test = await Test.create({
    file_url,
    name,
    appointment_id,
    report_status,
    cost,
    date,
  });
  res.status(200).json({ message: "Test Registered", test });
});

const getAllTest = catchAsync(async (req, res) => {
  const client = new Client(loginfo);
  client.connect();
  const query = 'SELECT test.name, test.id AS tid, test.date, test.appointment_id, appointment.patient_id AS pid, appointment.doctor_id FROM test, appointment WHERE test.appointment_id = appointment.id';
  const test =  await client.query(query);
  await client.end();
  res.status(200).json({message: "all tests", tests: test.rows});
})

const uploadTestReport = catchAsync(async (req, res) => {
  const {file} = req;
  const {path} = file;
  res.status(200).json({ message: "Test Report Uploaded", file_url: path });
});

const getPatientTests = catchAsync(async (req, res) => {
  const appointmentList = await Appointment.findAll({
    where: { patient_id: req.query.id },
  });
  const testList = await Test.findAll({
    where: {
      appointment_id: appointmentList.map((appointment) => appointment.id),
    },
  });
  res.status(200).json({ message: "Test List", testList });
});

export default { createTest, getPatientTests, uploadTestReport, getAllTest };
