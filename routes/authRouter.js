const { Router } = require('express');

const authRouter = Router();

authRouter.get('/signup', (req, res) => res.render('sign-up-form'));

module.exports = authRouter;
