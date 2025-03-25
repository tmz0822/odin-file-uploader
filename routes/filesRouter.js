const { Router } = require('express');

const filesRouter = Router();

const filesController = require('../controllers/filesController');

// Upload file
filesRouter.post('/', filesController.uploadFile);

module.exports = filesRouter;
