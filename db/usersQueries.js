const prisma = require('./prisma');

async function createUser(user) {
  return await prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
    },
  });
}

module.exports = { createUser };
