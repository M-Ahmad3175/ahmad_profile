const { body, validationResult } = require("express-validator");

// Validation rules for social links.
const socialLinkValidation = [
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

  body("github")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("GitHub URL must be valid"),

  body("linkedin")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("LinkedIn URL must be valid"),

  body("leetcode")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("LeetCode URL must be valid"),

  body("topcoder")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("TopCoder URL must be valid"),

  body("x")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("X profile URL must be valid"),

  body("whatsapp")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("WhatsApp URL must be valid"),

  body("email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Email must be valid"),

  body("resume")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Resume URL must be valid"),
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
  socialLinkValidation,
  handleValidationErrors,
};