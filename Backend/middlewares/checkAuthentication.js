import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { errorHandling } from "../utils/error.js";

export const checkAuthen = async (req, res, next) => {
  try {
    const token = req.cookies.uid;
    if (!token) {
      return next();
    }
    const payload = jwt.verify(token, process.env.JWT_CODE);
    if (!payload) {
      next(errorHandling(403, "User need to login"));
    }
    const user = await userModel.findOne({
      username: payload.username,
      email: payload.email,
    });
    if (!user) {
      next(errorHandling(403, "User need to login"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
