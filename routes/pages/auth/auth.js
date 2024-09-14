const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("auth/login", { title: "Login" });
});

router.get("/signup", (req, res) => {
  res.render("auth/signup", { title: "Signup" });
});

module.exports = router;
