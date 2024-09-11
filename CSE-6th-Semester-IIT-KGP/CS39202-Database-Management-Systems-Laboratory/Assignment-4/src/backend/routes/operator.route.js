import express from "express";
import controllers from "../controllers/operator.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/register",
  verifyTokenAndAuthorization(["admin"]),
  controllers.registerOperator
);

router.get(
  "/list",
  verifyTokenAndAuthorization(["admin"]),
  controllers.getOperators
);

router.post("/delete", 
verifyTokenAndAuthorization(["admin"]),
controllers.deleteOperator
);

export default router;
