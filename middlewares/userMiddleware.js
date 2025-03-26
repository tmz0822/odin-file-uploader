function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res
      .status(401)
      .json({ error: 'You are not authenticated to view this page.' });
  }
}

function verifyUser(req, res, next) {
  next();
}

module.exports = { isAuthenticated, verifyUser };
