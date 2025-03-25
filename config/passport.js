const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const prisma = require('../db/prisma');

const strategy = new LocalStrategy(async (username, password, done) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return done(null, false, { message: 'User not found' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return done(null, false, { message: 'Incorrect password' });
  }

  return done(null, user);
});

passport.use(strategy);

// Serialize user ID into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});
