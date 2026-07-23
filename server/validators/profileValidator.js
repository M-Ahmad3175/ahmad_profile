const { body, validationResult } = require("express-validator");

/* -------------------------------- Validation Rules ------------------------------- */

const profileValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ max: 100 })
    .withMessage("Full name cannot exceed 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("professionalTitle")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Professional title cannot exceed 100 characters"),

  body("bio")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Bio cannot exceed 2000 characters"),

  body("location")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Location cannot exceed 200 characters"),

  body("phone")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Phone number cannot exceed 30 characters"),

  body("whatsapp")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("WhatsApp number cannot exceed 30 characters"),

  body("resume")
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage("Resume must be a valid URL"),

  body("availableForWork")
    .optional()
    .isBoolean()
    .withMessage("availableForWork must be a boolean"),

  body("socialLinks")
    .optional()
    .isArray()
    .withMessage("socialLinks must be an array"),

  body("socialLinks.*.platform")
    .optional({ values: "falsy" })
    .trim()
    .notEmpty()
    .withMessage("Each social link platform is required"),

  body("socialLinks.*.url")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Each social link URL must be a valid URL"),

  body("socialLinks.*.enabled")
    .optional()
    .isBoolean()
    .withMessage("enabled must be a boolean"),

  body("socialLinks.*.order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a non-negative integer"),
];

/* --------------------------- Validation Error Handler --------------------------- */

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
  profileValidation,
  handleValidationErrors,
};
