import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandling } from "../utils/error.js";

const signup = async (req, res, next) => {
  const { username, email, age, password, confirmPassword, gender } = req.body;

  const validUser = await userModel.findOne({ username });
  const validEmail = await userModel.findOne({ email });
  if (validEmail) {
    return next(errorHandling(400, "Email already exist"));
  }
  if (validUser) {
    return next(errorHandling(400, "User already exist"));
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
    return next(errorHandling(400, "Password don't match,please try again"));
  }
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const salt = await bcryptjs.genSalt(saltRounds);
  const hashPassword = bcryptjs.hashSync(password, salt);

  try {
    const newUser = await userModel.create({
      username,
      email,
      age,
      password: hashPassword,
      gender,
      avatar: req.file.filename,
    });
    res.status(202).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
    return next(errorHandling(400, error.message));
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return next(errorHandling(400, "User doesn't exist"));
  }
  const checkPassword = await bcryptjs.compare(password, user.password);
  if (!checkPassword) {
    return next(errorHandling(400, "Incorrect Password"));
  }
  const token = jwt.sign({ username, email: user.email }, process.env.JWT_CODE);
  const oneHour = 3600000;
  res.cookie("uid", token, {
    maxAge: oneHour,
    httpOnly: true,
    secure: true,
    sameSite: true,
  });
  res.status(201).json({ login: "success" });
  console.log("user:", req.user);
  next("Login Success");
};

const logout = async (req, res, next) => {
  res.clearCookie("uid");
  next("logout");
};
export { signup, login, logout };
