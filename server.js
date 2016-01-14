var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

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

app.listen(port, ipaddress);