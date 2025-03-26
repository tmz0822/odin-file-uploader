const prisma = require('./prisma');

async function addFile(file, userId, folderId = null) {
  await prisma.file.create({
    data: {
      name: file.name,
      size: file.size,
      user: { connect: { id: userId } },
      folder: folderId ? { connect: { id: folderId } } : undefined,
    },
  });
}

async function getRootFolderFiles(userId) {
  const files = await prisma.file.findMany({
    where: {
      folderId: null,
      userId: userId,
    },
  });

  return files;
}

async function getFiles(folderId, userId) {
  const files = await prisma.file.findMany({
    where: {
      folderId: folderId,
      userId: userId,
    },
  });

  return files;
}

module.exports = { addFile, getRootFolderFiles, getFiles };
