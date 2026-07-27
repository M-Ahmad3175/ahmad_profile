const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Protected Routes                              */
/* -------------------------------------------------------------------------- */

// Get dashboard statistics.
router.get(
  "/dashboard",
  authMiddleware,
  dashboardController.getDashboardStatistics
);

module.exports = router;