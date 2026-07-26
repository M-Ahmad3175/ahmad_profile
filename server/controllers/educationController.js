const educationService = require("../services/educationService");

// Get all education records.
async function getEducation(req, res, next) {
  try {
    const education = await educationService.getEducation();

    res.status(200).json({
      success: true,
      data: {
        education,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get a single education record by ID.
async function getEducationById(req, res, next) {
  try {
    const education = await educationService.getEducationById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        education,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Create a new education record.
async function createEducation(req, res, next) {
  try {
    const education = await educationService.createEducation(req.body);

    res.status(201).json({
      success: true,
      message: "Education record created successfully",
      data: {
        education,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Update an education record.
async function updateEducation(req, res, next) {
  try {
    const education = await educationService.updateEducation(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Education record updated successfully",
      data: {
        education,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Delete an education record.
async function deleteEducation(req, res, next) {
  try {
    const result = await educationService.deleteEducation(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};