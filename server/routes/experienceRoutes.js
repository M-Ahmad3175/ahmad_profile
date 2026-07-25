const express = require("express");
const experienceController = require("../controllers/experienceController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  experienceValidation,
  handleValidationErrors,
} = require("../validators/experienceValidator");

const router = express.Router();

// Public routes: anyone can view portfolio experience.
router.get("/experiences", experienceController.getExperiences);
router.get("/experiences/:id", experienceController.getExperience);

// Protected routes: only authenticated admin can manage experience entries.
router.post(
  "/experiences",
  authMiddleware,
  experienceValidation,
  handleValidationErrors,
  experienceController.createExperience
);

router.put(
  "/experiences/:id",
  authMiddleware,
  experienceValidation,
  handleValidationErrors,
  experienceController.updateExperience
);

router.delete(
  "/experiences/:id",
  authMiddleware,
  experienceController.deleteExperience
);

module.exports = router;