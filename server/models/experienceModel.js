const mongoose = require("mongoose");

// Create the experience schema for storing work history entries.
const experienceSchema = new mongoose.Schema(
  {
    // Job title for the experience entry.
    jobTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Company or organization where the experience took place.
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Type of employment for this role.
    employmentType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Freelance", "Remote", "Other"],
    },

    // Location of the job.
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Start date of the employment.
    startDate: {
      type: Date,
      required: true,
    },

    // End date of the employment, if it has ended.
    endDate: {
      type: Date,
    },

    // Indicates whether the person is still working in this role.
    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    // Description of the role and responsibilities.
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    // Technologies used in this role.
    technologies: {
      type: [String],
      default: [],
      set: (values) => values.map((value) => value.trim()),
    },

    // Order used to display experiences on the portfolio.
    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Export the Experience model.
module.exports = mongoose.model("Experience", experienceSchema);
