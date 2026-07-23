const Skill = require("../models/skillModel");

// Normalize incoming skill data before saving it.
const normalizeSkillData = (payload = {}) => {
  const normalized = { ...payload };

  if (normalized.name) {
    normalized.name = normalized.name.trim();
  }

  if (normalized.icon) {
    normalized.icon = normalized.icon.trim();
  }

  return normalized;
};

// Get all skills, sorted by featured status, display order, and creation date.
const getSkills = async () => {
  try {
    return await Skill.find({}).sort({ featured: -1, displayOrder: 1, createdAt: -1 });
  } catch (error) {
    throw new Error(`Failed to fetch skills: ${error.message}`);
  }
};

// Get one skill by ID.
const getSkillById = async (skillId) => {
  try {
    const skill = await Skill.findById(skillId);

    if (!skill) {
      const error = new Error("Skill not found");
      error.statusCode = 404;
      throw error;
    }

    return skill;
  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }

    throw new Error(`Failed to fetch skill: ${error.message}`);
  }
};

// Create a new skill using normalized input data.
const createSkill = async (payload = {}) => {
  try {
    const normalizedData = normalizeSkillData(payload);
    return await Skill.create(normalizedData);
  } catch (error) {
    throw new Error(`Failed to create skill: ${error.message}`);
  }
};

// Update an existing skill using normalized input data.
const updateSkill = async (skillId, payload = {}) => {
  try {
    const normalizedData = normalizeSkillData(payload);
    const updatedSkill = await Skill.findByIdAndUpdate(skillId, normalizedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSkill) {
      const error = new Error("Skill not found");
      error.statusCode = 404;
      throw error;
    }

    return updatedSkill;
  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }

    throw new Error(`Failed to update skill: ${error.message}`);
  }
};

// Delete a skill by ID.
const deleteSkill = async (skillId) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(skillId);

    if (!deletedSkill) {
      const error = new Error("Skill not found");
      error.statusCode = 404;
      throw error;
    }

    return { success: true, message: "Skill deleted successfully" };
  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }

    throw new Error(`Failed to delete skill: ${error.message}`);
  }
};

module.exports = {
  normalizeSkillData,
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
