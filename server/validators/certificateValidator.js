const { body, validationResult } = require("express-validator");

// Validation rules for certificate data
const certificateValidation = [
  // title must be present, trimmed, and not longer than 150 characters
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters"),

  // issuingOrganization must be present, trimmed, and not longer than 150 characters
  body("issuingOrganization")
    .notEmpty()
    .withMessage("Issuing organization is required")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Issuing organization cannot exceed 150 characters"),

  // issueDate must be present and must be a valid ISO date
  body("issueDate")
    .notEmpty()
    .withMessage("Issue date is required")
    .isISO8601()
    .withMessage("Issue date must be a valid ISO 8601 date"),

  // credentialId is optional but if provided must be trimmed and not longer than 100 characters
  body("credentialId")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Credential ID cannot exceed 100 characters"),

  // credentialUrl must be present, trimmed, and must be a valid URL
  body("credentialUrl")
    .notEmpty()
    .withMessage("Credential URL is required")
    .trim()
    .isURL()
    .withMessage("Credential URL must be a valid URL"),

  // certificateImage is optional but if provided must be trimmed
  body("certificateImage")
    .optional({ values: "falsy" })
    .trim(),

  // featured is optional but if provided must be a boolean
  body("featured")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("Featured must be a boolean"),

  // displayOrder is optional but if provided must be an integer and at least 0
  body("displayOrder")
    .optional({ values: "falsy" })
    .isInt({ min: 0 })
    .withMessage("Display order must be an integer greater than or equal to 0"),
];

// Middleware to handle validation errors and return a friendly response
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
  certificateValidation,
  handleValidationErrors,
};
