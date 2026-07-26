const { body, validationResult } = require("express-validator");

// Validation rules for creating and updating a resume.
const resumeValidation = [
  // Resume URL is required.
  body("resumeUrl")
    .trim()
    .notEmpty()
    .withMessage("Resume URL is required")
    .isURL()
    .withMessage("Resume URL must be a valid URL"),

  // Public ID is optional.
  body("publicId")
    .optional({ checkFalsy: true })
    .trim(),

  // File name is required.
  body("fileName")
    .trim()
    .notEmpty()
    .withMessage("File name is required")
    .isLength({ max: 255 })
    .withMessage("File name cannot exceed 255 characters"),

  // File size is required.
  body("fileSize")
    .notEmpty()
    .withMessage("File size is required")
    .isInt({ min: 0 })
    .withMessage("File size must be a positive number"),

  // Active status is optional.
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];

// Return validation errors if any exist.
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.errors = errors.array();

    return next(error);
  }

  next();
}

module.exports = {
  resumeValidation,
  handleValidationErrors,
};