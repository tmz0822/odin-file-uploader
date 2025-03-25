const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./db/prisma');
const filesRouter = require('./routes/filesRouter');
const foldersRouter = require('./routes/foldersRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session setup
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Passport
require('./config/passport');
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/files', filesRouter);
app.use('/folders', foldersRouter);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
