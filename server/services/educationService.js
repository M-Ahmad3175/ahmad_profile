const Education = require("../models/educationModel");

// Helper to clean the incoming education data before saving.
function normalizeEducationData(payload) {
  return {
    degree: payload.degree?.trim(),
    institution: payload.institution?.trim(),
    fieldOfStudy: payload.fieldOfStudy?.trim(),
    startDate: payload.startDate,
    endDate: payload.endDate || null,
    currentlyStudying: payload.currentlyStudying || false,
    grade: payload.grade?.trim(),
    description: payload.description?.trim(),
    displayOrder: payload.displayOrder || 0,
  };
}

// Get all education records sorted by display order and newest first.
async function getEducation() {
  try {
    return await Education.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });
  } catch (error) {
    const err = new Error("Failed to fetch education records");
    err.statusCode = 500;
    throw err;
  }
}

// Get one education record by ID.
async function getEducationById(educationId) {
  try {
    const education = await Education.findById(educationId);

    if (!education) {
      const error = new Error("Education record not found");
      error.statusCode = 404;
      throw error;
    }

    return education;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to fetch education record");
    err.statusCode = 500;
    throw err;
  }
}

// Create a new education record.
async function createEducation(payload) {
  try {
    const normalizedData = normalizeEducationData(payload);

    const education = new Education(normalizedData);

    return await education.save();
  } catch (error) {
    const err = new Error("Failed to create education record");
    err.statusCode = 500;
    throw err;
  }
}

// Update an existing education record.
async function updateEducation(educationId, payload) {
  try {
    const normalizedData = normalizeEducationData(payload);

    const education = await Education.findByIdAndUpdate(
      educationId,
      normalizedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!education) {
      const error = new Error("Education record not found");
      error.statusCode = 404;
      throw error;
    }

    return education;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to update education record");
    err.statusCode = 500;
    throw err;
  }
}

// Delete an education record.
async function deleteEducation(educationId) {
  try {
    const education = await Education.findByIdAndDelete(educationId);

    if (!education) {
      const error = new Error("Education record not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      success: true,
      message: "Education record deleted successfully",
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const err = new Error("Failed to delete education record");
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  normalizeEducationData,
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};