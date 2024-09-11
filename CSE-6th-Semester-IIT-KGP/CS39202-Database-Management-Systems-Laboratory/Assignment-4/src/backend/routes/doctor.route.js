import express from "express";
import controllers from "../controllers/doctor.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/register",
  verifyTokenAndAuthorization(["admin"]),
  controllers.registerDoctor
);

router.post("/delete", 
verifyTokenAndAuthorization(["admin"]),
controllers.deleteDoctor
);

router.get("/list", controllers.getDoctors);

export default router;
