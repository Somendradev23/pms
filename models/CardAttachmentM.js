const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const CardAttachmentM = sequelize.define("card_attachments", {
  card_attachment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CardAttachmentM;
