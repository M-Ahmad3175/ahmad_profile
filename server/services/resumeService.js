const Resume = require("../models/resumeModel");

// Helper to clean the incoming resume data before saving.
function normalizeResumeData(payload) {
  return {
    resumeUrl: payload.resumeUrl?.trim(),
    publicId: payload.publicId?.trim() || "",
    fileName: payload.fileName?.trim(),
    fileSize: payload.fileSize,
    isActive: payload.isActive ?? true,
  };
}

// Get all resumes sorted with active resume first.
async function getResumes() {
  try {
    return await Resume.find().sort({
      isActive: -1,
      createdAt: -1,
    });
  } catch (error) {
    const err = new Error("Failed to fetch resumes");
    err.statusCode = 500;
    throw err;
  }
}

// Get a single resume by ID.
async function getResumeById(resumeId) {
  try {
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      const error = new Error("Resume not found");
      error.statusCode = 404;
      throw error;
    }

    return resume;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to fetch resume");
    err.statusCode = 500;
    throw err;
  }
}

// Create a new resume.
async function createResume(payload) {
  try {
    const normalizedData = normalizeResumeData(payload);

    // Only one active resume is allowed.
    if (normalizedData.isActive) {
      await Resume.updateMany({}, { isActive: false });
    }

    const resume = new Resume(normalizedData);

    return await resume.save();
  } catch (error) {
    const err = new Error("Failed to create resume");
    err.statusCode = 500;
    throw err;
  }
}

// Update an existing resume.
async function updateResume(resumeId, payload) {
  try {
    const normalizedData = normalizeResumeData(payload);

    // If this resume is becoming active,
    // deactivate every other resume.
    if (normalizedData.isActive) {
      await Resume.updateMany(
        { _id: { $ne: resumeId } },
        { isActive: false }
      );
    }

    const resume = await Resume.findByIdAndUpdate(
      resumeId,
      normalizedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resume) {
      const error = new Error("Resume not found");
      error.statusCode = 404;
      throw error;
    }

    return resume;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to update resume");
    err.statusCode = 500;
    throw err;
  }
}

// Delete a resume.
async function deleteResume(resumeId) {
  try {
    const resume = await Resume.findByIdAndDelete(resumeId);

    if (!resume) {
      const error = new Error("Resume not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: "Resume deleted successfully",
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to delete resume");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  normalizeResumeData,
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};