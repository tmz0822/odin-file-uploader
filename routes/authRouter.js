const { Router } = require('express');

const authRouter = Router();

const authController = require('../controllers/authController');

authRouter.get('/signup', (req, res) => res.render('sign-up-form'));

authRouter.post('/signup', authController.signUp);

module.exports = authRouter;
