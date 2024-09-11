import catchAsync from "../utils/catchAsync.js";
import { findUserByEmail } from "../utils/utility.js";
import { Doctor } from "../models/index.js";
import bcrypt from "bcrypt";

const registerDoctor = catchAsync(async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    license,
    phone,
    position,
    specialization,
  } = req.body;

  const user = await findUserByEmail(email);
  if (user.table) {
    return res
      .status(409)
      .json({ message: `User already exists (${user.type})` });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const status = true;

  const doctor = await Doctor.create({    // Add the status
    email,
    password: encryptedPassword,
    name,
    address,
    phone,
    license,
    position,
    specialization,
    status
  });
  res.status(200).json({ message: "Doctor Registered", doctor });
});

const getDoctors = catchAsync(async (req, res) => {
  const { id } = req.query;
  if (id) {
    const doctor = await Doctor.findOne({ where: { id, status: true } }); // Add the status for removing the deleted ones ', status: true'
    return res.status(200).json({ doctor });
  }
  const doctors = await Doctor.findAll({where: {status: true}});
  res.status(200).json({ doctors });
});

const deleteDoctor = catchAsync(async(req, res) => {
  const Doc = await Doctor.findOne({where:{id: req.body.id}});
  if(!Doc)
  {
    res.status(404).json({message: "Doctor does not exist"});
  }
  const del = await Doctor.update({ status: false },
    {
      where: {
        id: req.body.id
      },
    });
  res.status(200).json({message: "deleted successfully"});
})

export default { registerDoctor, getDoctors, deleteDoctor };
