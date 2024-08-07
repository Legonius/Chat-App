import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update this with your client URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);
});

export { app, server, io };
