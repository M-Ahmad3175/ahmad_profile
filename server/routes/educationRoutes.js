const express = require("express");
const educationController = require("../controllers/educationController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  educationValidation,
  handleValidationErrors,
} = require("../validators/educationValidator");

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                Public Routes                               */
/* -------------------------------------------------------------------------- */

// Get all education records.
router.get("/education", educationController.getEducation);

// Get a single education record by ID.
router.get("/education/:id", educationController.getEducationById);

/* -------------------------------------------------------------------------- */
/*                              Protected Routes                              */
/* -------------------------------------------------------------------------- */

// Create a new education record.
router.post(
  "/education",
  authMiddleware,
  educationValidation,
  handleValidationErrors,
  educationController.createEducation
);

// Update an existing education record.
router.put(
  "/education/:id",
  authMiddleware,
  educationValidation,
  handleValidationErrors,
  educationController.updateEducation
);

// Delete an education record.
router.delete(
  "/education/:id",
  authMiddleware,
  educationController.deleteEducation
);

module.exports = router;