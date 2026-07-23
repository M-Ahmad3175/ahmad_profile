const express = require("express");
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const { projectValidation, handleValidationErrors } = require("../validators/projectValidator");

const router = express.Router();

// Public route to read all projects.
router.get("/projects", projectController.getProjects);

// Public route to read one project by ID.
router.get("/projects/:id", projectController.getProject);

// Protected route to create a new project.
// First we check authentication, then validate the request body,
// then run the controller to save the project.
router.post(
  "/projects",
  authMiddleware,
  projectValidation,
  handleValidationErrors,
  projectController.createProject
);

// Protected route to update an existing project.
// Authentication and validation happen before the controller.
router.put(
  "/projects/:id",
  authMiddleware,
  projectValidation,
  handleValidationErrors,
  projectController.updateProject
);

// Protected route to delete a project.
// Only authenticated users can remove a project.
router.delete("/projects/:id", authMiddleware, projectController.deleteProject);

module.exports = router;
