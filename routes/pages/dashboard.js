const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/dashboard", { title: "Dashboard" });
});

module.exports = router;
