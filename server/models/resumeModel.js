const mongoose = require("mongoose");

// Create the resume schema for storing resume information.
const resumeSchema = new mongoose.Schema(
  {
    // Public URL of the uploaded resume.
    resumeUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // Cloudinary public ID for deleting/replacing the resume.
    publicId: {
      type: String,
      trim: true,
      default: "",
    },

    // Original uploaded file name.
    fileName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    // File size in bytes.
    fileSize: {
      type: Number,
      required: true,
      min: 0,
    },

    // Indicates whether this is the active resume.
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Export the Resume model.
module.exports = mongoose.model("Resume", resumeSchema);