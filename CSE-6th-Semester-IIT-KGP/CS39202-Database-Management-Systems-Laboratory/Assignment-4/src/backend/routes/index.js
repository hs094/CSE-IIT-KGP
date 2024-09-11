import express from "express";
import authRoute from "./auth.route.js";
import adminRoute from "./admin.route.js";
import patientRoute from "./patient.route.js";
import doctorRoute from "./doctor.route.js";
import operatorRoute from "./operator.route.js";
import appointmentRoute from "./appointment.route.js";
import testRoute from "./test.route.js";
import roomRoute from "./room.route.js";
import slotRoute from "./slot.route.js";
import blockRoute from "./block.route.js";
import medicationRoute from "./medication.route.js";
import procedureRoute from "./procedure.route.js";
import stayRoute from "./stay.route.js";
import treatmentRoute from "./treatment.route.js";
import doseRoute from "./dose.route.js";
import invoiceRoute from "./invoice.route.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/patient",
    route: patientRoute,
  },
  {
    path: "/doctor",
    route: doctorRoute,
  },
  {
    path: "/operator",
    route: operatorRoute,
  },
  {
    path: "/appointment",
    route: appointmentRoute,
  },
  {
    path: "/test",
    route: testRoute,
  },
  {
    path: "/room",
    route: roomRoute,
  },
  {
    path: "/block",
    route: blockRoute,
  },
  {
    path: "/medication",
    route: medicationRoute,
  },
  {
    path: "/procedure",
    route: procedureRoute,
  },
  {
    path: "/stay",
    route: stayRoute,
  },
  {
    path: "/slot",
    route: slotRoute,
  },
  {
    path: "/treatment",
    route: treatmentRoute,
  },
  {
    path: "/dose",
    route: doseRoute,
  },
  {
    path: "/invoice",
    route: invoiceRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
