const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary using environment variables.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Diagnostic log to ensure the expected env var is loaded.
console.log('Cloudinary cloud_name env:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('Cloudinary URL env:', process.env.CLOUDINARY_URL);

// Export the configured Cloudinary instance.
module.exports = cloudinary;