const { Router } = require('express');

const foldersRouter = Router();

const foldersController = require('../controllers/foldersController');

foldersRouter.get('/', foldersController.getUserRootFolder);
foldersRouter.post('/', foldersController.createFolder);
foldersRouter.post('/:parentId', foldersController.createFolder); // Add folder inside folder

foldersRouter.get('/:id', foldersController.getUserFolder);

//foldersRouter.get('/:id/update', foldersController.updateUserFolderGet);
foldersRouter.post('/:id/update', foldersController.updateUserFolder);
foldersRouter.post('/:id/delete', foldersController.deleteUserFolder);

module.exports = foldersRouter;
