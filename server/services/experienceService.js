const Experience = require("../models/experienceModel");

// Helper to clean incoming experience data before saving or updating.
function normalizeExperienceData(payload) {
  return {
    jobTitle: payload.jobTitle?.trim(),
    company: payload.company?.trim(),
    employmentType: payload.employmentType,
    location: payload.location?.trim(),
    startDate: payload.startDate,
    endDate: payload.endDate,
    currentlyWorking: payload.currentlyWorking,
    description: payload.description?.trim(),
    technologies: Array.isArray(payload.technologies)
      ? payload.technologies.map((technology) => technology.trim())
      : [],
    displayOrder: payload.displayOrder,
  };
}

// Get all experience entries sorted by display order and newest first.
async function getExperiences() {
  try {
    return await Experience.find().sort({
      displayOrder: 1,
      startDate: -1,
      createdAt: -1,
    });
  } catch (error) {
    const err = new Error("Failed to fetch experiences");
    err.statusCode = 500;
    throw err;
  }
}

// Get one experience by its ID.
async function getExperienceById(experienceId) {
  try {
    const experience = await Experience.findById(experienceId);

    if (!experience) {
      const error = new Error("Experience not found");
      error.statusCode = 404;
      throw error;
    }

    return experience;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to fetch experience");
    err.statusCode = 500;
    throw err;
  }
}

// Create a new experience.
async function createExperience(payload) {
  try {
    const normalizedData = normalizeExperienceData(payload);

    const experience = new Experience(normalizedData);

    return await experience.save();
  } catch (error) {
    const err = new Error("Failed to create experience");
    err.statusCode = 500;
    throw err;
  }
}

// Update an existing experience.
async function updateExperience(experienceId, payload) {
  try {
    const normalizedData = normalizeExperienceData(payload);

    const experience = await Experience.findByIdAndUpdate(
      experienceId,
      normalizedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!experience) {
      const error = new Error("Experience not found");
      error.statusCode = 404;
      throw error;
    }

    return experience;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to update experience");
    err.statusCode = 500;
    throw err;
  }
}

// Delete an experience.
async function deleteExperience(experienceId) {
  try {
    const experience = await Experience.findByIdAndDelete(experienceId);

    if (!experience) {
      const error = new Error("Experience not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: "Experience deleted successfully",
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to delete experience");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  normalizeExperienceData,
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};