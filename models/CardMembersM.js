const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const CardMembersM = sequelize.define("board_members", {
  crd_member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

// const CardMembersM = sequelize.define("board_members", {
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   card_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

module.exports = CardMembersM;
