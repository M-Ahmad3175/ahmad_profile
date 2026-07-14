const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");

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

module.exports = app;