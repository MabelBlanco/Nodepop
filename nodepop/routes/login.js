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

    if (!(await user.comparePasswords(password))) {
      res.render("login", {
        title: res.__("Login"),
        error: res.__("Wrong password"),
        email: email,
      });
      return;
    }
    // Save the userId in cookie-session
    req.session.userId = user._id;

    res.redirect("/userProfile");
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.regenerate((error) => {
    error ? next(error) : res.redirect("/");
  });
});

module.exports = router;
