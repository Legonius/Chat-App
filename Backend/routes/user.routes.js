import express from "express";
import { login, logout, signup } from "../controllers/userController.js";
import { checkAuthen } from "../middlewares/checkAuthentication.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

const userRoute = express.Router();
userRoute.use(checkAuthen);
userRoute.post("/signup", upload.single("avatar"), signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

export { userRoute };
