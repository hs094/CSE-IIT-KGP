import { Doctor, Operator, Admin } from "../models/index.js";

const findUserByEmail = async (email) => {
  let user = {
    table: null,
    type: null,
  };
  const oldDoctor = await Doctor.findOne({ where: { email } });
  const oldAdmin = await Admin.findOne({ where: { email } });
  const oldOperator = await Operator.findOne({ where: { email } });

  if (oldDoctor) {
    user.table = oldDoctor;
    user.type = "doctor";
    if(!oldDoctor.status) user.table = null;
  } else if (oldAdmin) {
    user.table = oldAdmin;
    user.type = "admin";
  } else if (oldOperator) {
    user.table = oldOperator;
    user.type = "operator";
  }
  return user;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

export { findUserByEmail, extractToken };
