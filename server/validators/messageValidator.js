const { body, validationResult } = require("express-validator");

// Validation rules for contact message submissions.
const messageValidation = [
  // name is required, trimmed, and cannot exceed 100 characters
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),

  // email is required, trimmed, and must be a valid email address
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  // subject is required, trimmed, and cannot exceed 150 characters
  body("subject")
    .notEmpty()
    .withMessage("Subject is required")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Subject cannot exceed 150 characters"),

  // message is required, trimmed, and cannot exceed 2000 characters
  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Message cannot exceed 2000 characters"),
];

// Middleware to handle validation errors and return a friendly response.
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
  messageValidation,
  handleValidationErrors,
};
