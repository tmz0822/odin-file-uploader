const { Router } = require('express');

const authRouter = Router();

const authController = require('../controllers/authController');
const passport = require('passport');

authRouter.get('/signup', (req, res) => res.render('sign-up-form'));

authRouter.post('/signup', authController.signUp);

authRouter.get('/signin', (req, res) => res.render('sign-in-form'));

authRouter.post(
  '/signin',
  passport.authenticate('local'),
  authController.signIn
);

authRouter.post('/signout', authController.signOut);

module.exports = authRouter;
