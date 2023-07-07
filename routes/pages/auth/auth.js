const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("auth/login", { title: "Login" });
});

module.exports = router;
