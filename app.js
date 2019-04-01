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
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MONGODB CONECCTION ERROR! '));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', user);
app.use('/book', book);
app.listen(port, () => {
	console.log("Estamo in " + port);
});
