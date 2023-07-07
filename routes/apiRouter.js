const express = require("express");
const router = express.Router();

// Import controllers
const projectController = require("../controllers/ProjectC");
const taskController = require("../controllers/TaskC");
const userController = require("../controllers/UserC");
const commentController = require("../controllers/CommentC");
const authController = require("../controllers/AuthC");

// Project routes
router.get("/projects", projectController.getAllProjects);
router.post("/projects", projectController.createProject);
router.get("/projects/:projectId", projectController.getProjectById);
router.put("/projects/:projectId", projectController.updateProject);
router.delete("/projects/:projectId", projectController.deleteProject);

// Task routes
router.get("/projects/:projectId/tasks", taskController.getTasksByProject);
router.post("/projects/:projectId/tasks", taskController.createTask);
router.get("/tasks/:taskId", taskController.getTaskById);
router.put("/tasks/:taskId", taskController.updateTask);
router.delete("/tasks/:taskId", taskController.deleteTask);

// User routes
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.get("/users/:userId", userController.getUserById);
router.put("/users/:userId", userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

// Comment routes
router.get("/tasks/:taskId/comments", commentController.getCommentsByTask);
router.post("/tasks/:taskId/comments", commentController.createComment);
router.get("/comments/:commentId", commentController.getCommentById);
router.put("/comments/:commentId", commentController.updateComment);
router.delete("/comments/:commentId", commentController.deleteComment);

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authController.getProfile);

module.exports = router;
