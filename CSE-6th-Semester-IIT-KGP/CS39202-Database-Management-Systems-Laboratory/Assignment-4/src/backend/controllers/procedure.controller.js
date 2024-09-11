import catchAsync from "../utils/catchAsync.js";
import { Procedure } from "../models/index.js";

const addProcedure = catchAsync(async (req, res) => {
  const { name, cost } = req.body;

  const procedure = await Procedure.create({
    name,
    cost,
  });
  res.status(200).json({ message: "Procedure added", procedure });
});

const getProcedures = catchAsync(async (req, res) => {
  const procedures = await Procedure.findAll({});
  res.status(200).json({ procedures });
});

export default { addProcedure, getProcedures };
