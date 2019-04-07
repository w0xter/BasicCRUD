//app.js
const express = require('express');
const bodyParser = require('body-parser');
const user  = require('./routes/user.route');
const book = require('./routes/book.route');
const app = express();
const mongoose = require('mongoose');

let port = 1234;
let dev_db_url = 'mongodb://localhost/users-api';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MONGODB CONECCTION ERROR! '));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', user);
app.use('/book', book);
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.listen(port, () => {
	console.log("Estamo in " + port);
});
