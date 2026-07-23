const Project = require("../models/Project");

// Normalize incoming project data before saving it.
const normalizeProjectData = (payload = {}) => {
  const normalized = { ...payload };

  if (normalized.title) {
    normalized.title = normalized.title.trim();
  }

  if (normalized.shortDescription) {
    normalized.shortDescription = normalized.shortDescription.trim();
  }

  if (normalized.fullDescription) {
    normalized.fullDescription = normalized.fullDescription.trim();
  }

  if (normalized.image) {
    normalized.image = normalized.image.trim();
  }

  if (normalized.githubUrl) {
    normalized.githubUrl = normalized.githubUrl.trim();
  }

  if (normalized.liveUrl) {
    normalized.liveUrl = normalized.liveUrl.trim();
  }

  if (Array.isArray(normalized.technologies)) {
    normalized.technologies = normalized.technologies.map((tech) => tech.trim());
  }

  return normalized;
};

// Get all projects, sorted by featured status and display order.
const getProjects = async () => {
  try {
    return await Project.find({}).sort({ featured: -1, displayOrder: 1, createdAt: -1 });
  } catch (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
};

// Get a single project by its ID.
const getProjectById = async (projectId) => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("Project not found");
      error.statusCode = 404;
      throw error;
    }

    return project;
  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }

    throw new Error(`Failed to fetch project: ${error.message}`);
  }
};

// Create a new project with normalized data.
const createProject = async (payload = {}) => {
  try {
    const normalizedData = normalizeProjectData(payload);
    return await Project.create(normalizedData);
  } catch (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
};

// Update an existing project with normalized data.
const updateProject = async (projectId, payload = {}) => {
  try {
    const normalizedData = normalizeProjectData(payload);
    const updatedProject = await Project.findByIdAndUpdate(projectId, normalizedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      const error = new Error("Project not found");
      error.statusCode = 404;
      throw error;
    }

    return updatedProject;
  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }

    throw new Error(`Failed to update project: ${error.message}`);
  }
};

// Delete a project by ID.
const deleteProject = async (projectId) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      const error = new Error("Project not found");
      error.statusCode = 404;
      throw error;
    }

    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    if (error.statusCode === 404) {
      throw error;
    }

    throw new Error(`Failed to delete project: ${error.message}`);
  }
};

module.exports = {
  normalizeProjectData,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
