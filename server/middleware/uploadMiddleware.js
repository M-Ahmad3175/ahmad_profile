const multer = require("multer");

// Store uploaded files temporarily in memory.
const storage = multer.memoryStorage();

// Allow only image files.
const fileFilter = (req, file, cb) => {
  if (file && file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    const err = new Error("Only image files are allowed");
    err.statusCode = 400;
    cb(err, false);
  }
};

// Configure multer upload settings.
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

module.exports = upload;