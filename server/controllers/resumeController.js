const resumeService = require("../services/resumeService");

// Get all resumes.
async function getResumes(req, res, next) {
  try {
    const resumes = await resumeService.getResumes();

    res.status(200).json({
      success: true,
      data: {
        resumes,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get a single resume by ID.
async function getResumeById(req, res, next) {
  try {
    const resume = await resumeService.getResumeById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        resume,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Create a new resume.
async function createResume(req, res, next) {
  try {
    const resume = await resumeService.createResume(req.body);

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: {
        resume,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Update an existing resume.
async function updateResume(req, res, next) {
  try {
    const resume = await resumeService.updateResume(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: {
        resume,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Delete a resume.
async function deleteResume(req, res, next) {
  try {
    const result = await resumeService.deleteResume(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};