const express = require("express");
const settingsController = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  settingsValidation,
  handleValidationErrors,
} = require("../validators/settingsValidator");

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                Public Routes                               */
/* -------------------------------------------------------------------------- */

// Get portfolio settings.
router.get("/settings", settingsController.getSettings);

/* -------------------------------------------------------------------------- */
/*                              Protected Routes                              */
/* -------------------------------------------------------------------------- */

// Create or update portfolio settings.
router.put(
  "/settings",
  authMiddleware,
  settingsValidation,
  handleValidationErrors,
  settingsController.saveSettings
);

module.exports = router;