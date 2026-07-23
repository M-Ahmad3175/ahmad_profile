const projectService = require("../services/projectService");

// Get all projects from the service layer.
const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects();

    return res.status(200).json({
      success: true,
      data: {
        projects,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get one project by ID from the service layer.
const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    return res.status(200).json({
      success: true,
      data: {
        project,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create a new project through the service layer.
const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: {
        project,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing project through the service layer.
const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: {
        project,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a project through the service layer.
const deleteProject = async (req, res, next) => {
  try {
    const result = await projectService.deleteProject(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
