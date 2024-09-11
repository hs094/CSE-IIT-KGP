import catchAsync from "../utils/catchAsync.js";
import { Treatment, Test, Stay, Room, Patient, Procedure, Dose, Medication, Doctor } from "../models/index.js";
import { Sequelize } from "sequelize";
import pg from 'pg';
const { Client } = pg;
import loginfo from "../config/pg_details.js";


const createInvoice = catchAsync(async (req, res) => {
    const client = new Client(loginfo);
    client.connect();
    const query = `SELECT * FROM dose, medication WHERE dose.treatment_id = ${req.body.id} AND dose.medication_id = medication.id;`;
    const treatment = await Treatment.findOne({
        where: { id: req.body.id },
    });
    if(!treatment) 
        res.status(200).json({message: "The patient is not yet discharged or created"});
    const patient = await Patient.findOne({where: {id: treatment.patient_id}});
    const doctor = await Doctor.findOne({where: {id: treatment.doctor_id}});
    const test = await Test.findOne({
        where: { id: treatment.test_id },
    });
    const procedure = await Procedure.findOne({
        where: { id: treatment.procedure_id },
    });
    const stay = await Stay.findOne({
        where: { id: treatment.stay_id },
    });
    const room = await Room.findOne({
        where: { room_number: stay.room },
    });
   const medication =  await client.query(query);
   await client.end();
   let total_cost = 0;
   let diff = stay.endtime - stay.starttime;
   diff = diff/1000;
   const factor = Math.ceil(diff/86400);
   total_cost = procedure.cost + test.cost + (room.cost*factor);
   medication.rows.forEach(element => {
        total_cost = total_cost + element.cost * element.dose_amount;
   });

    res.status(200).json({
        message: "Invoice",
        treatment_id: treatment.id,
        illness_details: treatment.illness_details,
        admit_date: stay.starttime,
        discharge_date:stay.endtime,
        test_name: test.name,
        test_cost: test.cost,
        test_date: test.date,
        patient_name: patient.name,
        patient_id: patient.id,
        patient_gender: patient.gender,
        patient_age: patient.age,
        doctor_name: doctor.name, 
        procedure_name: procedure.name,
        procedure_cost: procedure.cost,
        procedure_date: treatment.date,
        room_no: room.room_number,
        room_cost: room.cost,
        medication: medication.rows,
        totalcost: total_cost
    });
});

export default { createInvoice };
