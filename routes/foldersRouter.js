const { Router } = require('express');

const foldersRouter = Router();

const foldersController = require('../controllers/foldersController');

foldersRouter.get('/', foldersController.getUserFolders);
foldersRouter.post('/', foldersController.createFolder);

foldersRouter.post('/:id/update', foldersController.updateUserFolder);
foldersRouter.post('/:id/delete', foldersController.deleteUserFolder);

module.exports = foldersRouter;
