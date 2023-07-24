const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const CardLableM = sequelize.define("card_labels", {
  // label_id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
});


module.exports = CardLableM;
