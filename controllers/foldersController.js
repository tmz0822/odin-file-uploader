// TODO: CRUD folders

const db = require('../db/foldersQueries');

async function createFolder(req, res) {
  try {
    const { name } = req.body;
    const { parentId } = req.params;

    await db.createFolder(req.user.id, { name }, parentId);

    res.redirect(req.get('referer'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create folder' });
  }
}

async function getUserRootFolder(req, res) {
  try {
    const folders = await db.getUserRootFolder(req.user.id);
    console.log(folders);

    res.render('folders/index.ejs', { folders, folder: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get folders' });
  }
}

async function getUserFolder(req, res) {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;
    const folder = await db.getUserFolder(userId, folderId);

    res.render('folders/index.ejs', {
      folder: folder,
      folders: folder.subfolders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get folder' });
  }
}

async function updateUserFolder(req, res) {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;
    const { name } = req.body;

    await db.updateUserFolder(folderId, userId, { name });

    // Redirect back to current page
    res.redirect(req.get('referer'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update folder' });
  }
}

async function deleteUserFolder(req, res) {
  try {
    const folderId = req.params.id;

    await db.deleteUserFolder(folderId, userId);
    res.redirect(req.get('referer'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete folder' });
  }
}

module.exports = {
  createFolder,
  getUserRootFolder,
  getUserFolder,
  updateUserFolder,
  deleteUserFolder,
};
