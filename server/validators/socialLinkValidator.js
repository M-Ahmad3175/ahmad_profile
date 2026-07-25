const { body, validationResult } = require("express-validator");

// Validation rules for social links.
const socialLinkValidation = [
  // GitHub profile URL is optional but must be a valid URL.
  body("github")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("GitHub URL must be valid"),

  // LinkedIn profile URL is optional but must be a valid URL.
  body("linkedin")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("LinkedIn URL must be valid"),

  // LeetCode profile URL is optional but must be a valid URL.
  body("leetcode")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("LeetCode URL must be valid"),

  // TopCoder profile URL is optional but must be a valid URL.
  body("topcoder")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("TopCoder URL must be valid"),

  // X (Twitter) profile URL is optional but must be a valid URL.
  body("x")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("X profile URL must be valid"),

  // WhatsApp click-to-chat URL is optional but must be a valid URL.
  body("whatsapp")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("WhatsApp URL must be valid"),

  // Contact email is optional but must be a valid email address.
  body("email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Email must be valid"),

  // Resume URL is optional but must be a valid URL.
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