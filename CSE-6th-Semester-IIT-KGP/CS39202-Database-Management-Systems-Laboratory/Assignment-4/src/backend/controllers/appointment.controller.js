import catchAsync from "../utils/catchAsync.js";
import { Appointment, Slot, Patient, Doctor } from "../models/index.js";

const createAppointment = catchAsync(async (req, res) => {
  const { patient_id, doctor_id, slot_id } = req.body;
  const slot = await Slot.findOne({where:{id:slot_id, doctor_id}});
  if(!slot)
  {
    res.status(404).json({message:'Slot does not exist'});
  }

  if(!slot.status)
  {
    res.status(404).json({message:'Slot is already booked'});
  }
  const appointment = await Appointment.create({
    patient_id,
    doctor_id,
    starttime:slot.starttime,
    endtime:slot.endtime,
  });
  const slot2 = await Slot.update({ status: false },
    {
      where: {
        id: slot.id,
      },
    });
    const patient = await Patient.findOne({where:{id: patient_id}});
    const doctor = await Doctor.findOne({where:{id: doctor_id}});
  res.status(200).json({ message: "Appointment Registered", appointment:appointment, slot_id:slot.id, patient: patient, doctor:doctor });
});

const getAllAppointments = catchAsync(async (req, res) => {
  const appointments = await Appointment.findAll({});
  res.status(200).json({ message: "Appointment List", appointments });
});

const getDoctorAppointments = catchAsync(async (req, res) => {
  const appointments = await Appointment.findAll({
    where: { doctor_id: req.query.id },
  });
  res.status(200).json({ message: "Appointment List", appointments });
});

export default { createAppointment, getAllAppointments, getDoctorAppointments };
