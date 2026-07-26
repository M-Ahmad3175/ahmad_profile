const cloudinary = require("../config/cloudinary");

// Upload an image buffer to Cloudinary.
async function uploadImage(fileBuffer, folder) {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            resolve(result);
          }
        )
        .end(fileBuffer);
    });
  } catch (error) {
    const err = new Error("Failed to upload image");
    err.statusCode = 500;
    throw err;
  }
}

// Delete an image from Cloudinary using its public ID.
async function deleteImage(publicId) {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    const err = new Error("Failed to delete image");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  uploadImage,
  deleteImage,
};