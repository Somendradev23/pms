const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const CardM = sequelize.define("card", {
  card_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  list_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  card_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  remember_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = CardM;
