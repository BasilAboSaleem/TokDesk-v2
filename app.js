// ===========================
// TokDesk v2 - app.js
// ===========================

// --------- Imports ----------
const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const morgan = require("morgan"); 
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

// --------- Config / DB ----------
const connectDB = require("./config/db"); // MongoDB
const redis = require("./config/redis");  // Redis

// --------- Routes ----------
const landingRouter = require("./app/routes/landing");

/*
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const invitationRoutes = require("./routes/invitationRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
*/

// --------- App Initialization ----------
const app = express();

// --------- View Engine Setup ----------
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 

// --------- Database Connections ----------
connectDB();
redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

// --------- Middleware ----------
// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Method override for forms
app.use(methodOverride("_method"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use(cors({ origin: process.env.BASE_URL || "*", credentials: true }));

// Logger (dev only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate Limiter (basic)
app.use(
  rateLimit({
    windowMs: 1000, // 1 second
    max: 50,
    message: "Too many requests, please slow down.",
  })
);

// --------- Routes ----------
app.use("/", landingRouter);
/*
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/announcements", announcementRoutes);
*/

// --------- Health Check ----------
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

// --------- 404 Handler ----------
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// --------- Global Error Handler ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

// --------- Export App ----------
module.exports = app;
