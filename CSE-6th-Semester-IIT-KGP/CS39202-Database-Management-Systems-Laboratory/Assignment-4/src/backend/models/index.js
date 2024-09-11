import { Sequelize } from "sequelize";

import logger from "../config/logger.js";
import config from "../config/config.js";

//Models Imports
import { PatientModel } from "./patient.js";
import { DoctorModel } from "./doctor.js";
import { OperatorModel } from "./operator.js";
import { AdminModel } from "./admin.js";
import { AppointmentModel } from "./appointment.js";
import { TreatmentModel } from "./treatment.js";
import { MedicationModel } from "./medication.js";
import { ProcedureModel } from "./procedure.js";
import { DoseModel } from "./dose.js";
import { TestModel } from "./test.js";
import { SlotModel } from "./slot.js";
import { StayModel } from "./stay.js";
import { RoomModel } from "./room.js";
import { BlockModel } from "./block.js";

const sequelize = new Sequelize(config.db, {
  logging: false,
  dialect: "postgres",
  timezone: '+05:30',
  query: { raw: true },
});

const Patient = PatientModel(sequelize, Sequelize);
const Doctor = DoctorModel(sequelize, Sequelize);
const Operator = OperatorModel(sequelize, Sequelize);
const Admin = AdminModel(sequelize, Sequelize);
const Block = BlockModel(sequelize, Sequelize);
const Slot = SlotModel(sequelize, Sequelize);
const Stay = StayModel(sequelize, Sequelize);
const Room = RoomModel(sequelize, Sequelize);
const Appointment = AppointmentModel(sequelize, Sequelize);
const Procedure = ProcedureModel(sequelize, Sequelize);
const Treatment = TreatmentModel(sequelize, Sequelize);
const Medication = MedicationModel(sequelize, Sequelize);
const Test = TestModel(sequelize, Sequelize);
const Dose = DoseModel(sequelize, Sequelize);

sequelize.sync({ alter: false }).then(() => {
  logger.info("db and tables have been created");
});

export {
  Patient,
  Doctor,
  Operator,
  Admin,
  Appointment,
  Treatment,
  Medication,
  Procedure,
  Dose,
  Test,
  Slot,
  Stay,
  Room,
  Block,
};
