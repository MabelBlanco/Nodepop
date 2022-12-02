var express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("userProfile", {
    title: res.__("User Profile"),
  });
});

module.exports = router;
