"use strict";

var os = require('os');
var express = require('express');
var app = express();
app.listen(3000);

app.get('/', function(req, res){
	throw new Error("Can't divide by zero")
  res.send('Hello, I`m Dr. Spencer Reid');
});

app.get('/__info', function (req, res) {

    var _package = require('./package.json');
    res.json({
        hostname : os.hostname(),
        pid: process.pid,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        package: _package,
        env: app.get('env')
    });
});

app.route('/cache')
  .get(function(req, res) {
  	res.json({Method : req.method});
  })
  .post(function(req, res) {
    res.json({Method : req.method});
  })
  .delete(function(req, res) {
    res.json({Method : req.method});
  });

app.post('/cache/new', function (req, res) {
  	res.json({Method : req.method});
  });


process.on('uncaughtException', function (err) {
    console.log('uncaughtException : ' + err);
});