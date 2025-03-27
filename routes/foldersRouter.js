const { Router } = require('express');

const foldersRouter = Router();

const foldersController = require('../controllers/foldersController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

foldersRouter.use(isAuthenticated);

foldersRouter.get('/', foldersController.getUserRootFolder);
foldersRouter.post('/', foldersController.createFolder);
foldersRouter.post('/:parentId', foldersController.createFolder); // Add folder inside folder

foldersRouter.get('/:id', foldersController.getUserFolder);

foldersRouter.post('/:id/update', foldersController.updateUserFolder);
foldersRouter.post('/:id/delete', foldersController.deleteUserFolder);

module.exports = foldersRouter;
