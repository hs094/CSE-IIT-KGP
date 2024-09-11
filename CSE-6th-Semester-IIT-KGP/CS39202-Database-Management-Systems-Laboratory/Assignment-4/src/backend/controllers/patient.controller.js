import catchAsync from "../utils/catchAsync.js";
import { Patient, Appointment, Treatment, Medication } from "../models/index.js";
import pg from 'pg';
const { Client } = pg;
import loginfo from "../config/pg_details.js";

const addPatient = catchAsync(async (req, res) => {
  const { name, address, gender, age, phone } = req.body;
  const patient = await Patient.create({
    name,
    address,
    gender,
    age,
    phone,
  });
  res.status(200).json({ message: "Patient Registered", patient });
});

const getPatientById = catchAsync(async (req, res) => {
  const patient = await Patient.findOne({where:{id: req.body.id}});
  if(!patient)
  {
    res.status(404).json({error:"Patient does not exist"});
  }
  res.status(200).json({message: "Patient Data", patient: patient});
})

const getAllPatients = catchAsync(async (req, res) => {
  const patientList = await Patient.findAll({});
  res.status(200).json({ message: "Patient List", patientList });
});

const getAppointmentPatients = catchAsync(async (req, res) => {
  const { doctor_id } = req.query;
  const client = new Client(loginfo);
  client.connect();
  const query = `SELECT patient.id as patient_id, patient.name, appointment.id, appointment.starttime, appointment.endtime from patient, appointment where appointment.patient_id = patient.id AND appointment.doctor_id = ${doctor_id}`;
  const data = await client.query(query);
  client.end();
  res.status(200).json({ message: "Patient List", appointments: data.rows });
});

const getTreatedPatients = catchAsync(async (req, res) => {
  const { doctor_id } = req.query;
  const client = new Client(loginfo);
  client.connect();
  const query = `SELECT patient.id as patient_id, patient.name, treatment.id, treatment.date, procedure.name AS procedure_name, stay.room, treatment.illness_details from patient, procedure, treatment, stay where treatment.patient_id = patient.id AND treatment.stay_id = stay.id AND treatment.procedure_id = procedure.id AND treatment.doctor_id = ${doctor_id}`;
  const data = await client.query(query);
  client.end();
  res.status(200).json({ message: "Patient List", treatments: data.rows });
});

const getEntirePatientDetails = catchAsync(async (req, res) => {
  const { doctor_id, patient_id } = req.body;
  const client = new Client(loginfo);
  client.connect();
  const query = `SELECT patient.id AS patient_id, patient.name AS patient_name, patient.age, patient.gender, patient.phone, treatment.id as treatment_id, treatment.date, treatment.illness_details, stay.room, treatment.file_url, procedure.name AS procedure_name, test.name, test.file_url AS test_file_url FROM patient, treatment, stay, procedure, test WHERE patient.id = treatment.patient_id AND treatment.patient_id = ${patient_id} AND treatment.doctor_id = ${doctor_id} AND treatment.procedure_id = procedure.id AND treatment.test_id = test.id AND treatment.stay_id = stay.id`;
  const data = await client.query(query);
  client.end();
  res.status(200).json({ message: "Patient List", details: data.rows });
});

const getMedicationByTreatment = catchAsync(async (req, res) => {
  const { id } = req.query;
  const query = `SELECT medication.name, medication.id, dose.dose_amount, medication.brand, medication.description FROM dose, medication WHERE dose.medication_id = medication.id AND dose.treatment_id = ${id}`
  const client = new Client(loginfo);
  client.connect();
  const data = await client.query(query);
  client.end();
  res.status(200).json({ message: "Medication List", medic:data.rows });
});

const getInvoice = catchAsync(async (req, res) => {
  const { id } = req.query;
  fs.writeFile("./tmp/geojson.json", JSON.stringify(geoJSON), (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data saved");
    res.download(fileLocation, function (err) {
      console.log(err);
    });
  });
});



export default { addPatient, getAllPatients, getAppointmentPatients, getInvoice, getPatientById, getTreatedPatients, getEntirePatientDetails, getMedicationByTreatment };
