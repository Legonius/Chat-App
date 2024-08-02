import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./routes/user.routes.js";
import msgRoute from "./routes/message.routes.js";
import allUsersRoute from "./routes/allUsers.routes.js";
import cors from "cors";
import path from "path";
dotenv.config();

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("Mongodb connection error: ", err));

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true, // Allow credentials (cookies) to be sent
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
app.use(cors());
// additional setting to use if needed
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

app.use("/public", express.static(path.resolve("public")));
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
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
