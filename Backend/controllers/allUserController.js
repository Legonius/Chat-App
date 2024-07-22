import { userModel } from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const allUsers = await userModel.find(
      {
        _id: { $ne: userId },
      },
      "-password"
    );
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};
