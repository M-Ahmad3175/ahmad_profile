const express = require("express");
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

const app = express();

/* ----------------------------- Middlewares ----------------------------- */

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

/* -------------------------------- Routes ------------------------------- */

app.use("/api/v1", healthRoutes);
app.use("/api/v1/auth", authRoutes);

// Mount profile routes under the main API version prefix so all profile endpoints
// follow the same /api/v1 structure as the rest of the backend.
app.use("/api/v1", profileRoutes);

// Mount project routes under the main API version prefix so all project endpoints
// follow the same /api/v1 structure as the rest of the backend.
app.use("/api/v1", projectRoutes);

// Mount skill routes under the main API version prefix so all skill endpoints
// follow the same /api/v1 structure as the rest of the backend.
app.use("/api/v1", skillRoutes);

// Mount certificate routes under the main API version prefix so all certificate endpoints
// are available under /api/v1.
app.use("/api/v1", certificateRoutes);

module.exports = app;