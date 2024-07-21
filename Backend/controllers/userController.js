import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const signup = async (req, res) => {
  const { username, email, age, password, confirmPassword, gender } = req.body;
  function checkPassword(v) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(v);
  }
  if (!checkPassword(password)) {
    return res.status(400).json({
      error: `Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.`,
    });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "Password don't match,please try again" });
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
    });
    res.status(202).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "User doesn't exist" });
  }
  const checkPassword = await bcryptjs.compare(password, user.password);
  if (!checkPassword) {
    return res.status(400).json({ error: "Incorrect Password" });
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
