const express = require("express");
const socialLinkController = require("../controllers/socialLinkController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  socialLinkValidation,
  handleValidationErrors,
} = require("../validators/socialLinkValidator");

const router = express.Router();

// Public route: anyone can view the portfolio social links.
router.get("/social-links", socialLinkController.getSocialLinks);

// Protected route: only the authenticated admin can create or update social links.
router.put(
  "/social-links",
  authMiddleware,
  socialLinkValidation,
  handleValidationErrors,
  socialLinkController.saveSocialLinks
);

module.exports = router;