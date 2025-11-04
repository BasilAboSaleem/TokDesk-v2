// ===========================
// TokDesk v2 - server.js
// ===========================

// --------- Imports ----------
require('dotenv').config();
const http = require("http");
const { Server } = require("socket.io");
<<<<<<< HEAD
const app = require("./app");
=======
const { app } = require("./app");
>>>>>>> 2c5a1538b45e98d3d7ba8312b271876486a634e1

// --------- Environment ----------
const PORT = process.env.PORT || 3000;

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

  // Example: join a room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  // Example: leave a room
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`Socket ${socket.id} left room ${room}`);
  });

  // Example: chat message
  socket.on("chatMessage", ({ room, message, sender }) => {
    io.to(room).emit("chatMessage", { message, sender, timestamp: new Date() });
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("⚡ Client disconnected:", socket.id);
  });
});

// --------- Start Server ----------
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// --------- Export Server & io (optional) ----------
module.exports = { server, io };
