import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { extractToken } from "../utils/utility.js";

const verifyToken = (req, res, next) => {
  const extractedToken = extractToken(req);
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    extractedToken;

  console.log(token);
  if (!token) {
    return res
      .status(403)
      .json({ message: "token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log(decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

const verifyTokenAndAuthorization = (roleList) => {
  return (req, res, next) => {
    const extractedToken = extractToken(req);
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      extractedToken;

    if (!token) {
      return res
        .status(403)
        .json({ message: "token is required for authentication" });
    }
    try {
      console.log(token);
      const decoded = jwt.verify(token, config.jwtSecret);
      console.log(decoded);
      req.user = decoded;

      if (!roleList.includes(req.user.role) && req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "You are not allowed to access this route" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    next();
  };
};

export { verifyToken, verifyTokenAndAuthorization };
