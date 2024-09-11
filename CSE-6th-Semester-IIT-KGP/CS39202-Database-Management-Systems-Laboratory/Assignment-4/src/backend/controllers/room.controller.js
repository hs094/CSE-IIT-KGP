import catchAsync from "../utils/catchAsync.js";
import { Room } from "../models/index.js";

const addRoom = catchAsync(async (req, res) => {
  const { room_number, type, cost, block_id } = req.body;
  const room = await Room.create({
    room_number,
    type,
    cost,
    block_id,
  });
  res.status(200).json({ message: "Room Added", room });
});

const getFreeRooms = catchAsync(async (req, res) => {
  const roomList = await Room.findAll({ where: { available: true } });
  res.status(200).json({ message: "Free Room list", roomList });
});

const getAllRooms = catchAsync(async (req, res) => {
  const roomList = await Room.findAll({});
  res.status(200).json({ message: "All Room list", roomList });
});

export default { addRoom, getFreeRooms, getAllRooms };
