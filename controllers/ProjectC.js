const { ProjectM } = require("../models/index");

const validator = require("validatorjs");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectM.findAll();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const validation = new validator(req.body, {
      project_name: "required",
    });
    if (validation.fails()) {

      throw new ThrowError("ValidationError", validation.errors.all());
    }

    const { project_name } = req.body;
    const project = await ProjectM.create({
      project_name,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await ProjectM.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { project_name, start_date, end_date, status, budget } = req.body;
  try {
    const project = await ProjectM.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.project_name = project_name;
    project.start_date = start_date;
    project.end_date = end_date;
    project.status = status;
    project.budget = budget;
    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await ProjectM.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    await project.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
