const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

// Define the Project_Team model
const ProjectTeamM = sequelize.define("project_teams", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ProjectTeamM;
