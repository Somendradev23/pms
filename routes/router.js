module.exports = (app) => {
  app.use("/blank", (req, res) => {
    res.render("user/blank");
  });

  // app.use("/", (req, res) => {
  //   // res.redirect("/login");
  // });

  // AUTH
  app.use("/auth", require("./pages/auth/auth"));

  // DASHBOARD
  app.use("/dashboard", require("./pages/dashboard"));

  // USERS
  app.use("/users", require("./pages/users/users"));
};
