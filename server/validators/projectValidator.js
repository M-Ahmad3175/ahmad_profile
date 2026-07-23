const { body, validationResult } = require("express-validator");

// Define the validation rules for project data.
const projectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ max: 150 })
    .withMessage("Project title cannot exceed 150 characters"),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required")
    .isLength({ max: 300 })
    .withMessage("Short description cannot exceed 300 characters"),

  body("fullDescription")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Full description cannot exceed 5000 characters"),

  body("technologies")
    .optional()
    .isArray()
    .withMessage("Technologies must be an array"),

  body("githubUrl")
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),

  body("liveUrl")
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage("Live URL must be a valid URL"),

  body("image")
    .optional({ nullable: true })
    .trim(),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be a boolean"),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a non-negative integer"),

  body("status")
    .optional()
    .isIn(["completed", "ongoing"])
    .withMessage("Status must be either completed or ongoing"),
];

// Check for validation errors and return them in a clean format.
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
  projectValidation,
  handleValidationErrors,
};
