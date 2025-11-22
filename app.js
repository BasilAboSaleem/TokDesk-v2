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

// --------- Middlewares ----------
const i18nMiddleware = require("./app/middlewares/i18n");
const authMiddleware = require("./app/middlewares/authMiddleware");
const authorize = require("./app/middlewares/authorize");

// --------- App Initialization ----------
const app = express();

// --------- View Engine Setup ----------
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 

// --------- Database Connections ----------
connectDB();
redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

// --------- Global Middleware ----------

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Internationalization (i18n)
i18nMiddleware(app); 

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

// --------- Custom Middleware for Direct Messages & Online Users ----------
app.use(async (req, res, next) => {
  try {
    // fake data for demonstration; replace with real DB calls
    res.locals.directMessages = []; // or await getDirectMessagesForUser(req.user.id)
    res.locals.onlineUsers = []; // or await getOnlineUsers()

    next();
  } catch (err) {
    console.error(err);
    res.locals.directMessages = [];
    res.locals.onlineUsers = [];
    next();
  }
});


// --------- Routes ----------

const landingRouter = require("./app/routes/landing");
const authRoutes = require("./app/routes/authRoutes");
const dashboardRoutes = require("./app/routes/dashboardRoutes");
const superAdminRoutes = require("./app/routes/superAdminRoutes");
/*
const userRoutes = require("./app/routes/userRoutes");
const companyRoutes = require("./app/routes/companyRoutes");
const departmentRoutes = require("./app/routes/departmentRoutes");
const invitationRoutes = require("./app/routes/invitationRoutes");
const announcementRoutes = require("./app/routes/announcementRoutes");
*/
// Public routes
app.use("/", landingRouter);
app.use("/auth", authRoutes);

// --------- Auth & Global User Middleware ----------

// 🔹 Authentication: verify token & populate req.user
app.use(authMiddleware);

// 🔹 Global User Injection: make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.user
    ? {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        company: req.user.company,
      }
    : null;
  next();
});




// Protected routes (authMiddleware + authorize can be used inside these routes)
app.use("/dashboard", dashboardRoutes);
app.use("/", superAdminRoutes);
/*
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
