const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const messages = require('./routes/newmessages')
const createError = require('http-errors');
const logger = require('morgan');

app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join('.')));
app.use('/newmessages', messages);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Listening on port', port);
});


module.exports = app;
