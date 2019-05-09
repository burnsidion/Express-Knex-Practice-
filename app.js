const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const messages = require('./routes/newmessages');
const createError = require('http-errors');
const logger = require('morgan');


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join('.')));
app.use('/messages', messages);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Listening on port', port);
});


module.exports = app;
