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

async function getUserRootFolder(userId) {
  const rootFolder = await prisma.folder.findMany({
    where: {
      userId: userId,
      parentId: null,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return rootFolder;
}

async function getUserFolder(userId, folderId) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
      userId: userId,
    },
    include: {
      subfolders: true,
    },
  });

  return folder;
}

async function updateUserFolder(folderId, userId, folder) {
  await prisma.folder.update({
    data: {
      name: folder.name,
    },
    where: {
      id: folderId,
      userId: userId,
    },
  });
}

async function deleteUserFolder(folderId, userId) {
  try {
    return await prisma.folder.delete({
      where: {
        id: folderId,
        userId: userId,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error('Folder not found or unauthorized');
    }
    throw new Error('Database error');
  }
}

module.exports = {
  createFolder,
  getUserRootFolder,
  updateUserFolder,
  deleteUserFolder,
  getUserFolder,
};
