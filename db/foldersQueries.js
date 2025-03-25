const prisma = require('./prisma');

// TODO: CRUD folders

async function createFolder(userId, folder, parentId = null) {
  const createdFolder = await prisma.folder.create({
    data: {
      name: folder.name,
      user: { connect: { id: userId } },
      parent: parentId ? { connect: { id: parentId } } : undefined,
    },
  });

  return createdFolder;
}

async function getUserFolders(userId) {
  const folders = await prisma.folder.findMany({
    where: {
      userId: userId,
    },

    include: {
      user: true,
      parent: true,
    },
  });

  console.log(folders);

  return folders;
}

async function updateUserFolder(folderId) {}

async function deleteUserFolder(folderId, userId) {
  await prisma.folder.delete({
    where: {
      id: folderId,
      userId: userId,
    },
  });
}

module.exports = {
  createFolder,
  getUserFolders,
  updateUserFolder,
  deleteUserFolder,
};
