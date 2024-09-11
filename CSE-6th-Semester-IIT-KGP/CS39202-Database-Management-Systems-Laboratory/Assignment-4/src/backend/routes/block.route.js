import express from "express";
import controllers from "../controllers/block.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
const router = express.Router();

router.get(
  "/list",
  verifyTokenAndAuthorization(["admin", "operator", "doctor"]),
  controllers.getBlocks
);

router.post(
  "/add",
  verifyTokenAndAuthorization(["operator"]),
  controllers.addBlock
);

export default router;
