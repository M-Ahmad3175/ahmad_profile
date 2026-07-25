const express = require("express");
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  messageValidation,
  handleValidationErrors,
} = require("../validators/messageValidator");

const router = express.Router();

// Public route: anyone can submit a new message through the contact form.
router.post(
  "/messages",
  messageValidation,
  handleValidationErrors,
  messageController.createMessage
);

// Protected routes: admin authentication is required to view or manage messages.
router.get("/messages", authMiddleware, messageController.getMessages);
router.get("/messages/:id", authMiddleware, messageController.getMessage);
router.patch("/messages/:id/read", authMiddleware, messageController.markMessageAsRead);
router.delete("/messages/:id", authMiddleware, messageController.deleteMessage);

module.exports = router;
