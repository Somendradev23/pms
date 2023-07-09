module.exports = (app) => {
  app.use("/blank", (req, res) => {
    res.render("user/blank");
  });

  // AUTH
  app.use("/login", require("./pages/auth/auth"));

  // DASHBOARD
  app.use("/dashboard", require("./pages/dashboard"));

  // USERS
  app.use("/users", require("./pages/users/users"));
};
