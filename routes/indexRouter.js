const { Router } = require('express');
const { requireAuth } = require('../middlewares/authMiddleware');

const indexRouter = Router();

indexRouter.get('/', requireAuth, (req, res) => res.render('index'));

module.exports = indexRouter;
