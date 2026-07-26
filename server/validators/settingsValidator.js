const { body, validationResult } = require("express-validator");

// Validation rules for creating and updating portfolio settings.
const settingsValidation = [
  // Website title is required.
  body("websiteTitle")
    .trim()
    .notEmpty()
    .withMessage("Website title is required")
    .isLength({ max: 100 })
    .withMessage("Website title cannot exceed 100 characters"),

  // Website description is optional.
  body("websiteDescription")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage("Website description cannot exceed 300 characters"),

  // SEO keywords are optional.
  body("seoKeywords")
    .optional()
    .isArray()
    .withMessage("SEO keywords must be an array"),

  // Logo URL is optional.
  body("logoUrl")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Logo URL must be a valid URL"),

  // Favicon URL is optional.
  body("faviconUrl")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Favicon URL must be a valid URL"),

  // Primary color is optional.
  body("primaryColor")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Primary color must be a valid hex color"),

  // Resume URL is optional.
  body("resumeUrl")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Resume URL must be a valid URL"),

  // Footer text is optional.
  body("footerText")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Footer text cannot exceed 200 characters"),

  // Contact email is optional.
  body("contactEmail")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  // Contact phone is optional.
  body("contactPhone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Contact phone cannot exceed 30 characters"),

  // Address is optional.
  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage("Address cannot exceed 300 characters"),
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
  settingsValidation,
  handleValidationErrors,
};