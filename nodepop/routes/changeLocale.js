const express = require("express");
const router = express.Router();

router.get("/:locale", (req, res, next) => {
  const locale = req.params.locale;

  res.cookie("nodepopLanguage", locale, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  });

  res.redirect(req.get("Referer"));
});

module.exports = router;
