const mongoose = require("mongoose");

// Create the education schema for storing academic qualifications.
const educationSchema = new mongoose.Schema(
  {
    // Degree or qualification name.
    degree: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Name of the institution.
    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    // Field of study or major.
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Education start date.
    startDate: {
      type: Date,
      required: true,
    },

    // Education end date.
    endDate: {
      type: Date,
    },

    // Indicates whether the education is currently in progress.
    currentlyStudying: {
      type: Boolean,
      default: false,
    },

    // GPA, CGPA, Percentage, Grade, etc.
    grade: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    // Short description about the education.
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    // Controls the display order on the portfolio.
    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    // Automatically create createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Export the Education model.
module.exports = mongoose.model("Education", educationSchema);