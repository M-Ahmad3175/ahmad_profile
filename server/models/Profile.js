const mongoose = require("mongoose");

const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: [true, "Platform name is required"],
      trim: true,
      maxlength: [100, "Platform name cannot exceed 100 characters"],
    },
    url: {
      type: String,
      required: [true, "Social link URL is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/)/i.test(value);
        },
        message: "Social link must be a valid URL",
      },
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
      min: [0, "Order must be a non-negative number"],
    },
  },
  {
    _id: false,
  }
);

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    professionalTitle: {
      type: String,
      trim: true,
      maxlength: [100, "Professional title cannot exceed 100 characters"],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [2000, "Bio cannot exceed 2000 characters"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please provide a valid email address",
      },
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, "Phone number cannot exceed 30 characters"],
    },
    whatsapp: {
      type: String,
      trim: true,
      maxlength: [30, "WhatsApp number cannot exceed 30 characters"],
    },
    profileImage: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return !value || /^(https?:\/\/)/i.test(value);
        },
        message: "Resume must be a valid URL",
      },
    },
    availableForWork: {
      type: Boolean,
      default: false,
    },
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

/* Enforce a single portfolio profile in the collection. */
profileSchema.index({ _id: 1 }, { unique: true });

module.exports = mongoose.model("Profile", profileSchema);
