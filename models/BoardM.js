const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const BoardM = sequelize.define("board", {
  board_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  board_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = BoardM;
