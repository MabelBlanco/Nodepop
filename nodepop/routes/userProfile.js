var express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const user = await User.findById(userId);

    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const email = user.email;

    res.render("userProfile", {
      title: res.__("User Profile"),
      email: email,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
