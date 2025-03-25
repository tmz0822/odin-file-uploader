const prisma = require('./prisma');

async function createUser(user) {
  await prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
    },
  });
}

module.exports = { createUser };
