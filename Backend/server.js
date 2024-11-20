import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./routes/user.routes.js";
import msgRoute from "./routes/message.routes.js";
import allUsersRoute from "./routes/allUsers.routes.js";
import cors from "cors";
import path from "path";
import { app, server } from "./websocket.js";
import { fileURLToPath } from "url";

dotenv.config();

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB is connected"))
//   .catch((err) => console.log("Mongodb connection error: ", err));
let isConnected = false;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    isConnected = true;
    console.log("MongoDB is connected");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// const PORT = process.env.SERVER_PORT;s

// const corsOptions = {
//   origin: "*:*", //["http://localhost:5173", "http://192.168.100.171:5173"],
//   credentials: true, // Allow credentials (cookies) to be sent
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
//   allowedHeaders: "Content-Type,Authorization",
// };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "public/favicon.ico"))
);
const allowedOrigins = [
  "https://chat-app-frontend-ten-beta.vercel.app",
  "https://chat-app-frontend-6jsontuuz-zaw-min-thu-projects.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    credentials: true, // Allow cookies and credentials
  })
);

// Handle preflight requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// server.listen(PORT, () =>
//   console.log(`Server is running at http://localhost:${PORT}`)
// );

export default server;

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
