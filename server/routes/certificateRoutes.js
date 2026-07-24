const express = require("express");
const certificateController = require("../controllers/certificateController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  certificateValidation,
  handleValidationErrors,
} = require("../validators/certificateValidator");

const router = express.Router();

// Public routes: these can be accessed without login.
router.get("/certificates", certificateController.getCertificates);
router.get("/certificates/:id", certificateController.getCertificate);

// Protected routes: login is required before changing certificate data.
// Authentication runs first so the server checks the user identity before any validation or update logic.
router.post(
  "/certificates",
  authMiddleware,
  certificateValidation,
  handleValidationErrors,
  certificateController.createCertificate
);

router.put(
  "/certificates/:id",
  authMiddleware,
  certificateValidation,
  handleValidationErrors,
  certificateController.updateCertificate
);

router.delete(
  "/certificates/:id",
  authMiddleware,
  certificateController.deleteCertificate
);

// The controller is the last step because it handles the final response after authentication and validation succeed.
module.exports = router;
