import catchAsync from "../utils/catchAsync.js";
import { Medication } from "../models/index.js";

const addMedication = catchAsync(async (req, res) => {
  const { name, brand, description, cost } = req.body;

  const medication = await Medication.create({
    name,
    brand,
    description,
    cost,
  });
  res.status(200).json({ message: "Medication added", medication });
});

const getMedications = catchAsync(async (req, res) => {
  const medications = await Medication.findAll({});
  res.status(200).json({ medications });
});

export default { addMedication, getMedications };
