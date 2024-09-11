import catchAsync from "../utils/catchAsync.js";
import { Treatment, Test, Appointment, Patient } from "../models/index.js";

const createTreatment = catchAsync(async (req, res) => {
  const {
    patient_id,
    doctor_id,
    file_url,
    illness_details,
    test_id,
    procedure_id,
    stay_id,
    date,
  } = req.body;

  const treatment = await Treatment.create({
    patient_id,
    doctor_id,
    file_url,
    illness_details,
    test_id,
    procedure_id,
    stay_id,
    date,
  });
  res.status(200).json({ message: "Treatment registered", treatment });
});

const uploadTreatmentReport = catchAsync(async (req, res) => {
  const {file} = req;
  const {path} = file;
  res.status(200).json({ message: "Treatment Report Uploaded", file_url: path });
});

const getDoctorTreatments = catchAsync(async (req, res) => {
  console.log(req.query.id);
  const treatments = await Treatment.findAll({
    where: { doctor_id: req.query.id },
  });
  res.status(200).json({ message: "Treatment List", treatments });
});

export default { createTreatment, getDoctorTreatments, uploadTreatmentReport };
