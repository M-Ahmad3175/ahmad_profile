const { body, validationResult } = require("express-validator");

// Validation rules for experience data.
const experienceValidation = [
  // Job title is required, trimmed, and cannot exceed 100 characters.
  body("jobTitle")
    .notEmpty()
    .withMessage("Job title is required")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Job title cannot exceed 100 characters"),

  // Company name is required, trimmed, and cannot exceed 150 characters.
  body("company")
    .notEmpty()
    .withMessage("Company is required")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Company cannot exceed 150 characters"),

  // Employment type is required and must match one of the allowed values.
  body("employmentType")
    .notEmpty()
    .withMessage("Employment type is required")
    .isIn([
      "Full-time",
      "Part-time",
      "Internship",
      "Contract",
      "Freelance",
      "Remote",
      "Other",
    ])
    .withMessage("Invalid employment type"),

  // Location is required, trimmed, and cannot exceed 150 characters.
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Location cannot exceed 150 characters"),

  // Start date is required and must be a valid ISO date.
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  // End date is optional but must be a valid ISO date if provided.
  body("endDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("End date must be a valid date"),

  // Currently working is optional but must be boolean.
  body("currentlyWorking")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("Currently working must be true or false"),

  // If currentlyWorking is true then endDate should not be provided.
  body("endDate").custom((value, { req }) => {
    if (req.body.currentlyWorking === true || req.body.currentlyWorking === "true") {
      if (value) {
        throw new Error(
          "End date must be empty when currently working is true"
        );
      }
    }
    return true;
  }),

  // Description is required, trimmed, and cannot exceed 3000 characters.
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .isLength({ max: 3000 })
    .withMessage("Description cannot exceed 3000 characters"),

  // Technologies are optional but must be an array if provided.
  body("technologies")
    .optional({ values: "falsy" })
    .isArray()
    .withMessage("Technologies must be an array"),

  // Display order is optional but must be an integer greater than or equal to zero.
  body("displayOrder")
    .optional({ values: "falsy" })
    .isInt({ min: 0 })
    .withMessage("Display order must be greater than or equal to 0"),
];

// Middleware to handle validation errors.
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

module.exports = {
  experienceValidation,
  handleValidationErrors,
};