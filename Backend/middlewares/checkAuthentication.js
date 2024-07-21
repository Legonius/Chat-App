import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const checkAuthen = async (req, res, next) => {
  const token = req.cookies.uid;
  if (!token) {
    return next();
  }
  const payload = jwt.verify(token, process.env.JWT_CODE);
  const user = await userModel.findOne({
    username: payload.username,
    email: payload.email,
  });
  req.user = user;
  next();
};
