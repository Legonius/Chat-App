import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./routes/user.routes.js";
import msgRoute from "./routes/message.routes.js";
import allUsersRoute from "./routes/allUsers.routes.js";

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
app.use("/api/msg", msgRoute);
app.use("/api/all-users", allUsersRoute);

app.get("/", (req, res) => {
  res.status(200).json({ Server: "is running" });
});

//Error Handling as middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: "false",
    statusCode,
    message,
  });
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
