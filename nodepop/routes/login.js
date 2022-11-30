var express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login", {
    title: res.__("Login"),
  });
});

module.exports = router;
