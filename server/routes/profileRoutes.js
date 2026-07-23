const express = require("express");
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  profileValidation,
  handleValidationErrors,
} = require("../validators/profileValidator");

const router = express.Router();

// Public route to read the portfolio profile.
router.get("/profile", profileController.getProfile);

// Protected route to update the portfolio profile.
// authMiddleware is used first so only logged-in users can access this endpoint.
// Validation runs before the controller so bad input is rejected early.
// The controller is the last step because it only handles the request/response flow.
router.put(
  "/profile",
  authMiddleware,
  profileValidation,
  handleValidationErrors,
  profileController.saveProfile
);

module.exports = router;
