const mongoose = require("mongoose");

// Create the schema for storing portfolio social links.
const socialLinkSchema = new mongoose.Schema(
  {
    // GitHub profile URL.
    github: {
      type: String,
      trim: true,
    },

    // LinkedIn profile URL.
    linkedin: {
      type: String,
      trim: true,
    },

    // LeetCode profile URL.
    leetcode: {
      type: String,
      trim: true,
    },

    // TopCoder profile URL.
    topcoder: {
      type: String,
      trim: true,
    },

    // X (Twitter) profile URL.
    x: {
      type: String,
      trim: true,
    },

    // WhatsApp click-to-chat URL.
    whatsapp: {
      type: String,
      trim: true,
    },

    // Public contact email.
    email: {
      type: String,
      trim: true,
    },

    // Portfolio website URL.
    portfolio: {
      type: String,
      trim: true,
    },

    // Resume URL.
    resume: {
      type: String,
      trim: true,
    },

    
  },
  {
    // Automatically add createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Export the SocialLink model.
module.exports = mongoose.model("SocialLink", socialLinkSchema);