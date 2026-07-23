const mongoose = require("mongoose");

// Create the schema for a portfolio project entry.
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [150, "Project title cannot exceed 150 characters"],
    },

    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },

    fullDescription: {
      type: String,
      trim: true,
      maxlength: [5000, "Full description cannot exceed 5000 characters"],
    },

    technologies: {
      type: [String],
      default: [],
    },

    githubUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return !value || /^(https?:\/\/)/i.test(value);
        },
        message: "GitHub URL must be a valid http or https URL",
      },
    },

    liveUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return !value || /^(https?:\/\/)/i.test(value);
        },
        message: "Live URL must be a valid http or https URL",
      },
    },

    image: {
      type: String,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["completed", "ongoing"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
