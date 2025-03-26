const prisma = require('./prisma');

async function addFileToFolder(file, folderId = null) {
  await prisma.file.create({
    data: {
      name: file.name,
      size: file.size,
      folder: folderId ? { connect: { id: folderId } } : undefined,
    },
  });
}

module.exports = { addFileToFolder };
