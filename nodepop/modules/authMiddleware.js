function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    res.redirect("/login");
    return;
  }

  next();
}

module.exports = authMiddleware;
