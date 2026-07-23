const { body, validationResult } = require("express-validator");

// Define the validation rules for skill data.
const skillValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Skill name is required")
    .isLength({ max: 100 })
    .withMessage("Skill name cannot exceed 100 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Skill category is required")
    .isIn(["Frontend", "Backend", "Database", "Programming", "Tools", "Other"])
    .withMessage("Category must be one of Frontend, Backend, Database, Programming, Tools, or Other"),

  body("proficiency")
    .notEmpty()
    .withMessage("Proficiency is required")
    .isInt({ min: 0, max: 100 })
    .withMessage("Proficiency must be an integer between 0 and 100"),

  body("icon")
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
  skillValidation,
  handleValidationErrors,
};
