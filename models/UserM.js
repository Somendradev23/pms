const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const UserM = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "other", "backend", "frontend", "ui ux"),
      allowNull: false,
      defaultValue: "other",
      get() {
        const rawValue = this.getDataValue("role");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email", "mobileNumber"],
      },
    ],
  }
);

module.exports = UserM;
