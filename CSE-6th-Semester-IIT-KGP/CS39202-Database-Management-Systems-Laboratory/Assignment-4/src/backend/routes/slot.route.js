import express from "express";
import controllers from "../controllers/slot.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/add",
  verifyTokenAndAuthorization(["operator", "doctor"]),
  controllers.addSlot
);

router.get(
  "/list",
  verifyTokenAndAuthorization(["operator", "doctor"]),
  controllers.getSlots
);

router.post(
  "/listspec",
  verifyTokenAndAuthorization(["operator", "doctor"]),
  controllers.getSlotspec
);

export default router;
