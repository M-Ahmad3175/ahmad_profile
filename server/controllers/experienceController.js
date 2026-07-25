const experienceService = require("../services/experienceService");

// Get all experience entries.
async function getExperiences(req, res, next) {
  try {
    const experiences = await experienceService.getExperiences();

    res.status(200).json({
      success: true,
      data: {
        experiences,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get one experience by ID.
async function getExperience(req, res, next) {
  try {
    const experience = await experienceService.getExperienceById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        experience,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Create a new experience.
async function createExperience(req, res, next) {
  try {
    const experience = await experienceService.createExperience(req.body);

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: {
        experience,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Update an existing experience by ID.
async function updateExperience(req, res, next) {
  try {
    const experience = await experienceService.updateExperience(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: {
        experience,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Delete an experience by ID.
async function deleteExperience(req, res, next) {
  try {
    const result = await experienceService.deleteExperience(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};