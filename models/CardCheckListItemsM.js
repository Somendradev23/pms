const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const CardCheckListItemsM = sequelize.define("card_check_list_items", {
  checklist_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  checklist_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_checked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CardCheckListItemsM;