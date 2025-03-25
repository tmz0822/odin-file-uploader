const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
const session = require('express-session');
const passport = require('passport');
const authRouter = require('./routes/authRouter');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');

const app = express();

// Middleware
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
app.get('/', indexRouter);
app.get('/', authRouter);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
