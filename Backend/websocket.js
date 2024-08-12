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

const getSocketMap = {};

io.on("connection", (socket) => {
  const userID = socket.handshake.query.userId;
  if (userID) getSocketMap[userID] = socket.id;
  socket.on("disconnect", () => {
    delete getSocketMap[userID];
    io.emit("getOnlineUsers", getSocketMap);
  });
  io.emit("getOnlineUsers", getSocketMap);
});

const getSocketId = (id) => {
  return getSocketMap[id];
};

export { app, server, io, getSocketId };
