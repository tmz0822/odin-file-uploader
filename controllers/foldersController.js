// TODO: CRUD folders

const foldersQueries = require('../db/foldersQueries');
const filesQueries = require('../db/filesQueries');

async function createFolder(req, res) {
  try {
    const { name } = req.body;
    const { parentId } = req.params;

    await foldersQueries.createFolder(req.user.id, { name }, parentId);

    res.redirect(req.get('referer'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create folder' });
  }
}

async function getUserRootFolder(req, res) {
  try {
    const userId = req.user.id;
    const folders = await foldersQueries.getUserRootFolder(userId);
    const files = await filesQueries.getRootFolderFiles(userId);

    // folder: null because root folder is not added into database(confusing)
    res.render('folders/index.ejs', { folders, folder: null, files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get folders' });
  }
}

async function getUserFolder(req, res) {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;
    const folder = await foldersQueries.getUserFolder(userId, folderId);

    res.render('folders/index.ejs', {
      folder: folder,
      folders: folder.subfolders,
      files: folder.files,
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

    await foldersQueries.updateUserFolder(folderId, userId, { name });

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
    const userId = req.user.id;

    if (!folderId) {
      return res.status(400).json({ error: 'Folder ID is required' });
    }

    await foldersQueries.deleteUserFolder(folderId, userId);

    res.redirect(req.get('referer'));
  } catch (error) {
    if ((error.message = 'Folder not found or unauthorized')) {
      return res.status(404).json({ error: error.message });
    }
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
