const mongoose = require("mongoose");

// Define the certificate schema for storing portfolio certificates.
const certificateSchema = new mongoose.Schema(
  {
    // Certificate title (required)
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Organization that issued the certificate (required)
    issuingOrganization: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Date when the certificate was issued (required)
    issueDate: {
      type: Date,
      required: true,
    },

    // Optional credential identifier
    credentialId: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    // URL to the certificate credential (required and must be a valid http/https URL)
    credentialUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^https?:\/\//i.test(value);
        },
        message: "Credential URL must be a valid http or https URL.",
      },
    },

    // Optional image path or URL for the certificate image
    certificateImage: {
      type: String,
      trim: true,
    },

    // Whether the certificate should be featured on the portfolio
    featured: {
      type: Boolean,
      default: false,
    },

    // Display order for sorting certificates
    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the Certificate model
module.exports = mongoose.model("Certificate", certificateSchema);
