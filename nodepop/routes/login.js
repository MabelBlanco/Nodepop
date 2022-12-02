var express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("login", {
    title: res.__("Login"),
    error: "",
    email: "",
  });
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.render("login", {
        title: res.__("Login"),
        error: res.__("This email do not have an account"),
        email: email,
      });
      return;
    }

    if (user.password !== password) {
      res.render("login", {
        title: res.__("Login"),
        error: res.__("Wrong password"),
        email: email,
      });
      return;
    }

    res.redirect("/userProfile");
  } catch (error) {}
});

module.exports = router;
