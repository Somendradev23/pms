const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");


const ProjectM = sequelize.define("projects", {
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});


module.exports = ProjectM;
