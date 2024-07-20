import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("Mongodb connection error: ", err));

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ Server: "is running" });
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
