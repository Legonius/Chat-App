import express from "express";
import { login, logout, signup } from "../controllers/userController.js";
import { checkAuthen } from "../middlewares/checkAuthentication.js";

const userRoute = express.Router();
userRoute.use(checkAuthen);
userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

export { userRoute };
