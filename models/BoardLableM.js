const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const BoardLableM = sequelize.define("board_labels", {
  label_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  label_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = BoardLableM;
