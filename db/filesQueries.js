const { Prisma } = require('@prisma/client');
const prisma = require('./prisma');

async function addFile(file, userId, folderId = null) {
  const addedFile = await prisma.file.create({
    data: {
      name: file.name,
      size: file.size,
      uploadTime: file.uploadTime,
      user: { connect: { id: userId } },
      folder: folderId ? { connect: { id: folderId } } : undefined,
    },
  });
  console.log(addedFile);
  return addedFile;
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

async function getFileById(fileId, userId) {
  try {
    const file = await prisma.file.findUniqueOrThrow({
      where: {
        id: fileId,
        userId: userId,
      },
    });
    return file;
  } catch (error) {
    console.log(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new Error('File not found or unauthorized.');
    }

    throw new Error('An unexpected error occurred');
  }
}

module.exports = { addFile, getRootFolderFiles, getFiles, getFileById };
