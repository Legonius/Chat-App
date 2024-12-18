import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { errorHandling } from "../utils/error.js";

export const checkAuthen = async (req, res, next) => {
  try {
    const token = req.cookies?.uid;
    // if (!token) {
    //   return next(errorHandling(403, "session expired"));
    // }
    const payload = jwt.verify(token, process.env.JWT_CODE);
    if (!payload) {
      console.log("jwt can't verify");
      return next(errorHandling(403, "User need to login"));
    }
    const user = await userModel.findOne({
      username: payload.username,
      email: payload.email,
    });
    if (!user) {
      return next(errorHandling(403, "User need to login"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
