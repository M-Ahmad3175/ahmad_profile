const mongoose = require("mongoose");

// Create the settings schema for storing global portfolio settings.
const settingsSchema = new mongoose.Schema(
  {
    // Website title displayed in the browser.
    websiteTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Website meta description.
    websiteDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    // SEO keywords.
    seoKeywords: {
      type: [String],
      default: [],
      set: (values) => values.map((value) => value.trim()),
    },

    // Website logo URL.
    logoUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // Website favicon URL.
    faviconUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // Primary theme color.
    primaryColor: {
      type: String,
      trim: true,
      default: "#2563eb",
    },

    // Resume download URL.
    resumeUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // Footer copyright text.
    footerText: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    // Public contact email.
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // Public contact phone.
    contactPhone: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    // Public address.
    address: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Settings model.
module.exports = mongoose.model("Settings", settingsSchema);