const express = require("express");
const skillController = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");
const { skillValidation, handleValidationErrors } = require("../validators/skillValidator");

const router = express.Router();

// Public routes for reading skills.
router.get("/skills", skillController.getSkills);
router.get("/skills/:id", skillController.getSkill);

// Protected routes for creating, updating, and deleting skills.
// Authentication runs first so only logged-in users can access these actions.
// Validation runs before the controller so invalid data is rejected early.
router.post(
  "/skills",
  authMiddleware,
  skillValidation,
  handleValidationErrors,
  skillController.createSkill
);

router.put(
  "/skills/:id",
  authMiddleware,
  skillValidation,
  handleValidationErrors,
  skillController.updateSkill
);

router.delete("/skills/:id", authMiddleware, skillController.deleteSkill);

module.exports = router;
