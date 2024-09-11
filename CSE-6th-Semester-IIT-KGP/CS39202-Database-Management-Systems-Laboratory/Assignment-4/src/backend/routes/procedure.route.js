import express from "express";
import controllers from "../controllers/procedure.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/add",
  verifyTokenAndAuthorization(["operator"]),
  controllers.addProcedure
);

router.get(
  "/list",
  verifyTokenAndAuthorization(["operator"]),
  controllers.getProcedures
);

export default router;
