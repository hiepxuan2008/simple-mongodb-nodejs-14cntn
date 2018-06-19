var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// set up express app
var app = express();

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/meanjs");
mongoose.connection.once('open', function() {
    console.log("Connect to db successfully!");
}).on('error', function() {
    console.error("Connect db failed!");
});
mongoose.Promise = global.Promise;

// body parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express serve static files
app.use(express.static('./public'));

// view engine
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/website'));
app.use('/api/', require('./routes/api'));

// listen for requests from client
app.listen(3000, function() {
    console.log("Ready to connect to port 3000");
});