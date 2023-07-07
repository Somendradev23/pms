const express = require("express");
const router = express.Router();

router.get("/addUser", (req, res) => {
  res.render("admin/users/userAdd", { title: "Add User" });
});
router.get("/userList", (req, res) => {
  res.render("admin/users/userList", { title: "User List" });
});

module.exports = router;
