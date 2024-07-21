import express from "express";
import { login, signup } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);

export { userRoute };
