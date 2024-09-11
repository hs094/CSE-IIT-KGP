import express from "express";
import controllers from "../controllers/auth.controller.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../middleware/auth.js";
const router = express.Router();

router.post("/login", controllers.login);

router.get("/verify", verifyToken, controllers.verify);

router.get(
  "/details",
  verifyTokenAndAuthorization(["operator", "doctor", "admin"]),
  controllers.getDetails
);

export default router;
