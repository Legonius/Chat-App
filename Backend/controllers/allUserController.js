import { userModel } from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const allUsers = await userModel.find(
      {
        _id: { $ne: userId },
      },
      "-password"
    ); //.select("-password");this is same method
    if (!allUsers) {
      return res
        .status(404)
        .json({ success: false, message: "users not found" });
    }
    res.status(201).json(allUsers);
  } catch (error) {
    next(error);
  }
};
