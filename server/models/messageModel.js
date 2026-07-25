const mongoose = require("mongoose");

// Create the message schema for contact form submissions.
const messageSchema = new mongoose.Schema(
  {
    // Sender's name (required)
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Sender's email address (required)
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Subject of the message (required)
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Main message content (required)
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    // Tracks whether the message has been read by the admin
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the Message model
module.exports = mongoose.model("Message", messageSchema);
