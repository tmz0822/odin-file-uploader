const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');

const app = express();

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', indexRouter);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
