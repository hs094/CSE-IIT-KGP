import catchAsync from "../utils/catchAsync.js";
import { Dose } from "../models/index.js";

const createDose = catchAsync(async (req, res) => {
  const { medication_id, dose_amount, treatment_id } = req.body;

  const dose = await Dose.create({
    medication_id,
    dose_amount,
    treatment_id,
  });
  res.status(200).json({ message: "Dose registered", dose });
});

export default { createDose };
