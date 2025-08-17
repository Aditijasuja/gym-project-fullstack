import AppError from "../utils/errorutils.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res,next) => {
  const { token } = req.cookies;
  if (!token) {
    console.log("Token ", token);
    return res.status(400).json({ message: "Token Missing" });
  }
  const userDetails = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;
  next();
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default isLoggedIn;
