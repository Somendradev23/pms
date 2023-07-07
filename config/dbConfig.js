const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("project_mng_sys", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //   logging: false, // Set to true to see SQL queries in the console
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// sequelize.sync({ alter: true }, () => {
//   console.log("Synced db.");
// });

module.exports = sequelize;
