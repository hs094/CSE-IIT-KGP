import express from "express";
import controllers from "../controllers/dose.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["operator", "doctor"]),
  controllers.createDose
);

export default router;
