const express = require("express");
const multer = require("multer");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const messageRoutes = require("./routes/messageRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const socialLinkRoutes = require("./routes/socialLinkRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const educationRoutes = require("./routes/educationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

/* -------------------------------------------------------------------------- */
/*                                 Middlewares                                */
/* -------------------------------------------------------------------------- */

// Secure HTTP headers.
app.use(helmet());

// Enable Cross-Origin Resource Sharing.
// Enable Cross-Origin Resource Sharing.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://ahmad-portfolio-cms.vercel.app",
    credentials: true,
  })
);
// Compress all HTTP responses.
app.use(compression());

// Parse incoming JSON requests.
app.use(express.json());

// Parse cookies from incoming requests.
app.use(cookieParser());

// Log HTTP requests during development.
app.use(morgan("dev"));

/* -------------------------------------------------------------------------- */
/*                                    Routes                                  */
/* -------------------------------------------------------------------------- */

// Health check routes.
app.use("/api/v1", healthRoutes);

// Authentication routes.
app.use("/api/v1/auth", authRoutes);

// Profile routes.
app.use("/api/v1", profileRoutes);

// Project routes.
app.use("/api/v1", projectRoutes);

// Skill routes.
app.use("/api/v1", skillRoutes);

// Certificate routes.
app.use("/api/v1", certificateRoutes);

// Contact message routes.
app.use("/api/v1", messageRoutes);

// Experience routes.
app.use("/api/v1", experienceRoutes);

// Social link routes.
app.use("/api/v1", socialLinkRoutes);

// Image upload routes.
app.use("/api/v1", uploadRoutes);
// Mount education routes under the main API version prefix so all education endpoints
// are available under /api/v1.
app.use("/api/v1", educationRoutes);
// Mount resume routes under the main API version prefix so all resume endpoints
// are available under /api/v1.
app.use("/api/v1", resumeRoutes);
// Mount settings routes under the main API version prefix so all settings endpoints
// are available under /api/v1.
app.use("/api/v1", settingsRoutes);
// Mount dashboard routes under the main API version prefix so all dashboard endpoints
// are available under /api/v1.
app.use("/api/v1", dashboardRoutes);

/* -------------------------------------------------------------------------- */
/*                              Global Error Handler                          */
/* -------------------------------------------------------------------------- */

app.use((err, req, res, next) => {
  // Handle Multer file upload errors.
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Handle custom application errors.
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Log unexpected errors.
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

module.exports = app;