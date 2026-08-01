
const { uploadImage } = require("../services/cloudinaryService");


// Upload a profile image to Cloudinary.
async function uploadProfileImage(req, res, next) {
  try {
    // Check if an image was uploaded.
    if (!req.file) {
      const error = new Error("Please upload an image");
      error.statusCode = 400;
      throw error;
    }

    // Upload the image to the "profile" folder in Cloudinary.
    const result = await uploadImage(req.file.buffer, "profile");

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Upload a project image to Cloudinary.
async function uploadProjectImage(req, res, next) {
  try {
    // Check if an image was uploaded.
    if (!req.file) {
      const error = new Error("Please upload an image");
      error.statusCode = 400;
      throw error;
    }

    // Upload the image to the "projects" folder in Cloudinary.
    const result = await uploadImage(req.file.buffer, "projects");

    res.status(200).json({
      success: true,
      message: "Project image uploaded successfully",
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Upload a certificate image to Cloudinary.
async function uploadCertificateImage(req, res, next) {
  try {
    // Check if an image was uploaded.
    if (!req.file) {
      const error = new Error("Please upload an image");
      error.statusCode = 400;
      throw error;
    }

    // Upload the image to the "certificates" folder in Cloudinary.
    const result = await uploadImage(req.file.buffer, "certificates");

    res.status(200).json({
      success: true,
      message: "Certificate image uploaded successfully",
      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadProfileImage,
  uploadProjectImage,
  uploadCertificateImage,
};