import express from "express";
import controllers from "../controllers/invoice.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["operator"]),
  controllers.createInvoice
);

export default router;
