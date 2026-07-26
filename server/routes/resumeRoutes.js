const express = require("express");
const resumeController = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  resumeValidation,
  handleValidationErrors,
} = require("../validators/resumeValidator");

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                Public Routes                               */
/* -------------------------------------------------------------------------- */

// Get all resumes.
router.get("/resume", resumeController.getResumes);

// Get a single resume by ID.
router.get("/resume/:id", resumeController.getResumeById);

/* -------------------------------------------------------------------------- */
/*                              Protected Routes                              */
/* -------------------------------------------------------------------------- */

// Create a new resume.
router.post(
  "/resume",
  authMiddleware,
  resumeValidation,
  handleValidationErrors,
  resumeController.createResume
);

// Update an existing resume.
router.put(
  "/resume/:id",
  authMiddleware,
  resumeValidation,
  handleValidationErrors,
  resumeController.updateResume
);

// Delete a resume.
router.delete(
  "/resume/:id",
  authMiddleware,
  resumeController.deleteResume
);

module.exports = router;