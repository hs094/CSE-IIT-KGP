import express from "express";
import controllers from "../controllers/room.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.get(
  "/list",
  verifyTokenAndAuthorization(["operator"]),
  controllers.getAllRooms
);

router.get(
  "/freelist",
  verifyTokenAndAuthorization(["operator"]),
  controllers.getFreeRooms
);

router.post(
  "/add",
  verifyTokenAndAuthorization(["operator"]),
  controllers.addRoom
);

export default router;
