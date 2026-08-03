const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporterConfig = {
  host: process.env.SMTP_HOST || process.env.EMAIL_HOST,
  port: Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587),
  secure: process.env.SMTP_SECURE === "true" || process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
  },
};

// Create a reusable transporter for sending emails through Gmail or SMTP.
const transporter = nodemailer.createTransport(
  transporterConfig.host
    ? transporterConfig
    : {
        service: process.env.EMAIL_SERVICE || "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      }
);

// Send an email using the configured transporter.
async function sendEmail(options = {}) {
  const mailOptions = {
    from: options.from || process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: options.to || process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: options.subject || "Portfolio notification",
    text: options.text || "",
    html: options.html || undefined,
  };

  if (!mailOptions.to) {
    throw new Error("No email recipient configured");
  }

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
};
