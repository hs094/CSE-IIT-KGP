import express from "express";
import controllers from "../controllers/stay.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["operator"]),
  controllers.createStay
);

router.post(
  "/discharge",
  verifyTokenAndAuthorization(["operator"]),
  controllers.dischargeStay
);

router.get(
  "/getalldischarged",
  verifyTokenAndAuthorization(["operator"]),
  controllers.getAlldischarged
);

router.get(
  "/getalladmitted",
  verifyTokenAndAuthorization(["operator", "doctor"]),
  controllers.getAlladmitted
);

export default router;
