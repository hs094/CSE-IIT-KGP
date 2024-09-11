import catchAsync from "../utils/catchAsync.js";
import { findUserByEmail } from "../utils/utility.js";
import { Admin } from "../models/index.js";
import bcrypt from "bcrypt";

const registerAdmin = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;

  const user = await findUserByEmail(email);
  if (user.table) {
    return res
      .status(409)
      .json({ message: `User already exists (${user.type})` });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    email,
    password: encryptedPassword,
    name,
  });
  res.status(200).json({ message: "Admin Registered", admin });
});

export default { registerAdmin };
