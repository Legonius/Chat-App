import express from "express";
import { login, logout, signup } from "../controllers/userController.js";
import { checkAuthen } from "../middlewares/checkAuthentication.js";
import multer from "multer";
import fs from "fs";

// Ensure the destination directory exists to save photos
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./public/images";
    ensureDirExists(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

const userRoute = express.Router();
// userRoute.use(checkAuthen);
userRoute.post("/signup", upload.single("avatar"), signup);
userRoute.post("/login", login);
userRoute.get("/logout", checkAuthen, logout);

export { userRoute };
