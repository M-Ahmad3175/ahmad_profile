const cloudinary = require("../config/cloudinary");


// Upload an image buffer to Cloudinary.
async function uploadImage(fileBuffer, folder) {
  try {
    // Diagnostic: log current Cloudinary config to trace incorrect cloud_name
    try { console.log('cloudinary config at upload time:', cloudinary.config && cloudinary.config().cloud_name); } catch (e) { console.log('cloudinary config read error', e && e.message); }
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              // Attach status code for the global handler
              error.statusCode = error.statusCode || 500;

              // Fallback: try the direct upload API with a base64 data URI.
              try {
                const base64 = fileBuffer.toString("base64");
                const dataUri = `data:image/png;base64,${base64}`;

                return cloudinary.uploader
                  .upload(dataUri, { folder, resource_type: "image" })
                  .then((res) => resolve(res))
                  .catch((uploadErr) => {
                    uploadErr.statusCode = uploadErr.statusCode || 500;
                    return reject(uploadErr);
                  });
              } catch (fallbackErr) {
                fallbackErr.statusCode = fallbackErr.statusCode || 500;
                return reject(fallbackErr);
              }
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