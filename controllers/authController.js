const bcrypt = require('bcryptjs');
const db = require('../db/usersQueries');

async function signUp(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.createUser({ username, password: hashedPassword });

    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
}

async function signIn(req, res) {
  res.redirect('/');
}

async function signOut(req, res) {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect('/');
  });
}

module.exports = { signUp, signIn, signOut };
