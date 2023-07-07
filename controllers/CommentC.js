const {CommentM} = require("../models/index");

// Get all comments of a task
exports.getCommentsByTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const comments = await CommentM.findAll({ where: { task_id: taskId } });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new comment for a task
exports.createComment = async (req, res) => {
  const { taskId } = req.params;
  try {
    const { user_id, comment } = req.body;
    const newComment = await CommentM.create({
      user_id,
      comment,
      task_id: taskId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a specific comment by ID
exports.getCommentById = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await CommentM.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { user_id, comment } = req.body;
  try {
    const commentToUpdate = await CommentM.findByPk(commentId);
    if (!commentToUpdate) {
      return res.status(404).json({ message: "Comment not found" });
    }
    commentToUpdate.user_id = user_id;
    commentToUpdate.comment = comment;
    await commentToUpdate.save();
    res.json(commentToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await CommentM.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comment.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
