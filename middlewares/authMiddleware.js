function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/signin');
  }
  next();
}

module.exports = { isAuthenticated, requireAuth };
