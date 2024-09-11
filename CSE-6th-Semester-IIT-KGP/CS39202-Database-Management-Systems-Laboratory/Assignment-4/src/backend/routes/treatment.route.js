import express from "express";
import controllers from "../controllers/treatment.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.js";
import uploadImage from "../middleware/multer.js";
const router = express.Router();

router.post(
  "/create",
  verifyTokenAndAuthorization(["doctor", "operator"]),
  controllers.createTreatment
);

router.post(
  "/upload",
  [
    verifyTokenAndAuthorization(["doctor", "operator"]),
    uploadImage.single("image")
  ],
  controllers.uploadTreatmentReport
)

router.get(
  "/list/doctor",
  verifyTokenAndAuthorization(["operator", "doctor"]),
  controllers.getDoctorTreatments
);

export default router;
