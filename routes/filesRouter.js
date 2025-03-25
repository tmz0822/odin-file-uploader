const { Router } = require('express');

const filesRouter = Router();

const filesController = require('../controllers/filesController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

filesRouter.post('/', isAuthenticated, filesController.uploadFile); // Upload file

module.exports = filesRouter;
