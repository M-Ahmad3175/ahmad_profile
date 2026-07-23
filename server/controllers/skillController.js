const skillService = require("../services/skillService");

// Get all skills from the service layer.
const getSkills = async (req, res, next) => {
  try {
    const skills = await skillService.getSkills();

    return res.status(200).json({
      success: true,
      data: {
        skills,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get one skill by ID from the service layer.
const getSkill = async (req, res, next) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);

    return res.status(200).json({
      success: true,
      data: {
        skill,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create a new skill through the service layer.
const createSkill = async (req, res, next) => {
  try {
    const skill = await skillService.createSkill(req.body);

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: {
        skill,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing skill through the service layer.
const updateSkill = async (req, res, next) => {
  try {
    const skill = await skillService.updateSkill(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: {
        skill,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a skill through the service layer.
const deleteSkill = async (req, res, next) => {
  try {
    const result = await skillService.deleteSkill(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
