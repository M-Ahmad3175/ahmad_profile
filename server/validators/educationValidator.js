const { body, validationResult } = require("express-validator");

// Validation rules for creating and updating an education record.
const educationValidation = [
  // Degree is required.
  body("degree")
    .trim()
    .notEmpty()
    .withMessage("Degree is required")
    .isLength({ max: 150 })
    .withMessage("Degree cannot exceed 150 characters"),

  // Institution name is required.
  body("institution")
    .trim()
    .notEmpty()
    .withMessage("Institution is required")
    .isLength({ max: 200 })
    .withMessage("Institution cannot exceed 200 characters"),

  // Field of study is required.
  body("fieldOfStudy")
    .trim()
    .notEmpty()
    .withMessage("Field of study is required")
    .isLength({ max: 150 })
    .withMessage("Field of study cannot exceed 150 characters"),

  // Start date is required.
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  // End date is optional.
  body("endDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("End date must be a valid date"),

  // Currently studying is optional.
  body("currentlyStudying")
    .optional()
    .isBoolean()
    .withMessage("Currently studying must be true or false"),

  // Grade is optional.
  body("grade")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Grade cannot exceed 50 characters"),

  // Description is optional.
  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),

  // Display order is optional.
  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be 0 or greater"),
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
  educationValidation,
  handleValidationErrors,
};