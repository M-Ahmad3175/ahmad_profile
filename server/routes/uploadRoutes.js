const express = require("express");
const uploadController = require("../controllers/uploadController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Protected route: upload a profile image.
router.post(
  "/upload/profile",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadProfileImage
);

// Protected route: upload a project image.
router.post(
  "/upload/project",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadProjectImage
);

// Protected route: upload a certificate image.
router.post(
  "/upload/certificate",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadCertificateImage
);

module.exports = router;