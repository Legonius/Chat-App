import express from "express";
import { createServer } from "http";
import Server from "socket.io";
import initializeSocket from "socket.io"; //  versin ^2.2.0

const app = express();
const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*:*",
//   },
// });

// Initialize socket.io with the server versin ^2.2.0
const io = initializeSocket(server, {
  // Specify allowed origins
  origins: ["http://localhost:5173", "http://192.168.100.171:5173"], // Older method for socket.io@2.x
  credentials: true,
  handlePreflightRequest: (req, res) => {
    // Determine the correct origin to allow
    const allowedOrigins = [
      "http://localhost:5173",
      "http://192.168.100.171:5173",
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": origin, // Dynamically allow the correct origin
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true,
      });
    } else {
      res.writeHead(403, {
        "Content-Type": "text/plain",
      });
      res.end("CORS policy: This origin is not allowed.");
      return;
    }
    res.end();
  },
});

// Cors Problem Solving
// --------------------
// const io = new Server(server, {
//   handlePreflightRequest: (req, res) => {
//     const headers = {
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//       "Access-Control-Allow-Credentials": true,
//     };
//     res.writeHead(200, headers);
//     res.end();
//   },
// });

// Cors Problem Solving
// --------------------
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://192.168.100.171:5173"], //"http://localhost:5173", // Update this with your client URL
//     methods: ["GET", "POST"],
//   },
// });

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
