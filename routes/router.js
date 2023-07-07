module.exports = (app) => {
  app.use("/blank", (req, res) => {
    res.render("user/blank");
  });

  app.use("/login", require("./pages/auth/auth"));

  app.use("/dashboard", require("./pages/dashboard"));

  // USERS
  app.use("/users", require("./pages/users/users"));
};
