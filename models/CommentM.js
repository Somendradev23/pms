const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const TaskM = require("./TaskM");
const UserM = require("./UserM");

// Define the Comment model
const CommentM = sequelize.define("comments", {
  comment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


module.exports = CommentM;
