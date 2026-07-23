const mongoose = require("mongoose");

// Create the schema for a portfolio skill entry.
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      maxlength: [100, "Skill name cannot exceed 100 characters"],
    },

    category: {
      type: String,
      required: [true, "Skill category is required"],
      enum: ["Frontend", "Backend", "Database", "Programming", "Tools", "Other"],
    },

    proficiency: {
      type: Number,
      required: [true, "Proficiency is required"],
      min: [0, "Proficiency cannot be less than 0"],
      max: [100, "Proficiency cannot be greater than 100"],
    },

    icon: {
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
      min: [0, "Display order cannot be less than 0"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);
