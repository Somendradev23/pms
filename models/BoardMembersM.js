const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const BoardMemberM = sequelize.define("board_members", {
  brd_member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// const BoardMemberM = sequelize.define("board_members", {
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   board_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

module.exports = BoardMemberM;
