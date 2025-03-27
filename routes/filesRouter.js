const { Router } = require('express');

const filesRouter = Router();

const filesController = require('../controllers/filesController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

filesRouter.use(isAuthenticated);

filesRouter.get('/:id', filesController.getFile);

filesRouter.get('/:id/download', filesController.downloadFile);

filesRouter.post('/', filesController.uploadFile);
filesRouter.post('/:folderId', filesController.uploadFile);

filesRouter.post('/:id/delete', filesController.deleteFile);

module.exports = filesRouter;
