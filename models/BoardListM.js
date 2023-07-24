const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const BoardListM = sequelize.define("board_list", {
  list_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  list_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = BoardListM;
