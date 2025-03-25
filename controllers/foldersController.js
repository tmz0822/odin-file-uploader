// TODO: CRUD folders

const db = require('../db/foldersQueries');

async function createFolder(req, res) {
  try {
    const { name } = req.body;

    await db.createFolder(req.user.id, { name });

    res.redirect('/folders');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create folder' });
  }
}

async function getUserFolders(req, res) {
  try {
    const folders = await db.getUserFolders();
    console.log(folders);
    res.render('folders/index.ejs', { folders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get folders' });
  }
}

async function updateUserFolder(req, res) {}

async function deleteUserFolder(req, res) {}

module.exports = {
  createFolder,
  getUserFolders,
  updateUserFolder,
  deleteUserFolder,
};
