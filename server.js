// ===========================
// TokDesk v2 - server.js
// ===========================

// --------- Imports ----------
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

// --------- Environment ----------
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// --------- Create HTTP Server ----------
const server = http.createServer(app);

// --------- Initialize Socket.io ----------
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// --------- Socket.io Connection ----------
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`Socket ${socket.id} left room ${room}`);
  });

  socket.on("chatMessage", ({ room, message, sender }) => {
    io.to(room).emit("chatMessage", { message, sender, timestamp: new Date() });
  });

  socket.on("disconnect", () => {
    console.log("⚡ Client disconnected:", socket.id);
  });
});

// --------- Start Server ----------
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at: ${BASE_URL}`);
});

// ---------- Export Server & io (optional) ------------
module.exports = { server, io };
 