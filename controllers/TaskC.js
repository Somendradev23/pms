const {TaskM} = require("../models/index");

// Get all tasks of a project
exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await TaskC.findAll({ where: { project_id: projectId } });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new task for a project
exports.createTask = async (req, res) => {
  const { projectId } = req.params;
  try {
    const { task_name, description, start_date, end_date, status, assigned_to } = req.body;
    const task = await TaskC.create({
      task_name,
      description,
      start_date,
      end_date,
      status,
      assigned_to,
      project_id: projectId,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await TaskC.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { task_name, description, start_date, end_date, status, assigned_to } = req.body;
  try {
    const task = await TaskC.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.task_name = task_name;
    task.description = description;
    task.start_date = start_date;
    task.end_date = end_date;
    task.status = status;
    task.assigned_to = assigned_to;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await TaskC.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
