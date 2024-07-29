import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandling } from "../utils/error.js";

// Signup Secssion
const signup = async (req, res, next) => {
  const { username, email, age, password, confirmPassword, gender } = req.body;

  const validUser = await userModel.findOne({ username });
  const validEmail = await userModel.findOne({ email });
  if (validEmail) {
    return next(errorHandling(401, "Email already exist"));
  }
  if (validUser) {
    return next(errorHandling(401, "User already exist"));
  }

  function checkPassword(v) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(v);
  }
  if (!checkPassword(password)) {
    return next(
      errorHandling(
        400,
        `Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.`
      )
    );
  }
  if (password !== confirmPassword) {
    return next(errorHandling(401, "Password don't match,please try again"));
  }
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const salt = await bcryptjs.genSalt(saltRounds);
  const hashPassword = await bcryptjs.hash(password, 10);
  try {
    const newUser = await userModel.create({
      username,
      email,
      age,
      password: hashPassword,
      gender,
      avatar: req.file ? req.file.filename : "default",
    });
    res.status(202).json({
      success: true,
      username: newUser.username,
      email: newUser.email,
      _id: newUser._id,
      avatar: newUser.avatar,
      gender: newUser.gender,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    return next(errorHandling(400, error.message));
  }
};

//Login Secssion
const login = async (req, res, next) => {
  try {
    if (req.cookie?.uid) {
      res.clearCookie("uid");
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return next(errorHandling(404, "User doesn't exist"));
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return next(errorHandling(401, "Incorrect Password"));
    }
    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_CODE
    );
    const oneHour = 3600000;
    res.cookie("uid", token, {
      maxAge: oneHour,
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    res.status(201).json({
      success: true,
      data: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        gender: user.gender,
        age: user.age,
      },
    });
    next();
  } catch (error) {
    next(error);
  }
};

//Logout Secssion
const logout = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandling(404, "User not login"));
    }
    res.clearCookie("uid");
    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    next(error);
  }
  next("logout");
};
const fingUser = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(errorHandling(404, "User not found"));
  }
  try {
    const data = await userModel.findOne({ _id: id });
    res.status(200).json({ success: true, data });
    next();
  } catch (error) {
    next(error);
  }
};
export { signup, login, logout, fingUser };
