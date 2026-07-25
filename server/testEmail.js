const dotenv = require("dotenv");
const { sendEmail } = require("./services/emailService");

dotenv.config();

async function testEmail() {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Portfolio CMS Email Test",
      text: "Congratulations! Nodemailer is working successfully.",
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}

testEmail();
