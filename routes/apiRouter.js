const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/Auth");

// Import controllers
const projectController = require("../controllers/ProjectC");
const taskController = require("../controllers/TaskC");
const userController = require("../controllers/UserC");
const commentController = require("../controllers/CommentC");
const authController = require("../controllers/AuthC");

// Project routes
router.get("/projects", [isAuthenticated], projectController.getAllProjects);
router.post("/projects", [isAuthenticated], projectController.createProject);
router.get("/projects/:projectId", [isAuthenticated], projectController.getProjectById);
router.put("/projects/:projectId", [isAuthenticated], projectController.updateProject);
router.delete("/projects/:projectId", [isAuthenticated], projectController.deleteProject);

// Task routes
router.get("/projects/:projectId/tasks", [isAuthenticated], taskController.getTasksByProject);
router.post("/projects/:projectId/tasks", [isAuthenticated], taskController.createTask);
router.get("/tasks/:taskId", [isAuthenticated], taskController.getTaskById);
router.put("/tasks/:taskId", [isAuthenticated], taskController.updateTask);
router.delete("/tasks/:taskId", [isAuthenticated], taskController.deleteTask);

// User routes
router.get("/users", [isAuthenticated], userController.getAllUsers);
router.post("/users", [isAuthenticated], userController.createUser);
router.get("/users/:userId", [isAuthenticated], userController.getUserById);
router.put("/users/:userId", [isAuthenticated], userController.updateUser);
router.delete("/users/:userId", [isAuthenticated], userController.deleteUser);

// Comment routes
router.get("/tasks/:taskId/comments", [isAuthenticated], commentController.getCommentsByTask);
router.post("/tasks/:taskId/comments", [isAuthenticated], commentController.createComment);
router.get("/comments/:commentId", [isAuthenticated], commentController.getCommentById);
router.put("/comments/:commentId", [isAuthenticated], commentController.updateComment);
router.delete("/comments/:commentId", [isAuthenticated], commentController.deleteComment);

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", [isAuthenticated], authController.getProfile);

module.exports = router;
