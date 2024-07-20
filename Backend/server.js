import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.get("/", (req, res) => {
  res.status(200).json({ Server: "is running" });
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
