import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./routes/user.routes.js";

dotenv.config();

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("Mongodb connection error: ", err));

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ Server: "is running" });
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
