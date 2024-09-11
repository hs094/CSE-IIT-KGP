import express from "express";
import controllers from "../controllers/admin.controller.js";
const router = express.Router();

router.post("/register", controllers.registerAdmin);

export default router;
