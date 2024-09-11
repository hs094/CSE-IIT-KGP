import catchAsync from "../utils/catchAsync.js";
import { Block } from "../models/index.js";

const addBlock = catchAsync(async (req, res) => {
  const { floor, code } = req.body;
  const block = await Block.create({
    floor,
    code,
  });
  res.status(200).json({ message: "Block Added", block });
});

const getBlocks = catchAsync(async (req, res) => {
  const blocks = await Block.findAll({});
  res.status(200).json({ message: "Blocks List", blocks });
});

export default { getBlocks, addBlock };
