const bcrypt = require('bcryptjs');
const { createUser } = require('../db/usersQueries');

async function signUp(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({ username, password: hashedPassword });

    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { signUp };
