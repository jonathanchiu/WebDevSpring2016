var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var express = require('express');
var uuid = require("node-uuid");
var session       = require('express-session');
var passport = require("passport");
var app = express();

var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/hello', function(req, res){
  res.send('hello world');
});

app.get('/user', function(req, res) {
  var users = [
    {username: "alice", firstName: "Alice", lastName: "Wonderland"},
    {username: "jon", firstName: "Jonny", lastName: "Chiu"},
  ];
  res.json(users);
});

require("./public/assignment/server/app.js")(app, uuid, db, mongoose);
require("./public/project/server/app.js")(app, uuid, db, mongoose);
app.listen(port, ipaddress);