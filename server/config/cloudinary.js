const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary using environment variables.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// (diagnostic logs removed)

// Export the configured Cloudinary instance.
module.exports = cloudinary;