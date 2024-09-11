import express from "express";
import controllers from "../controllers/patient.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["operator"]),
  controllers.addPatient
);

router.get(
  "/list",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.getAllPatients
);

router.get(
  "/treatmentlist",
  verifyTokenAndAuthorization(["doctor"]),
  controllers.getTreatedPatients
);

router.get(
  "/appointmentlist",
  verifyTokenAndAuthorization(["doctor"]),
  controllers.getAppointmentPatients
);

router.post(
  "/getpatient",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.getPatientById
);

router.post(
  "/getentirepatient",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.getEntirePatientDetails
);

router.get(
  "/getmedicationbytreatment",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.getMedicationByTreatment
);

export default router;
