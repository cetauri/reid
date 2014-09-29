"use strict";

var os = require('os');
var util = require("util");
var redis = require("redis");
var rClient = redis.createClient();//    rc = new redis.createClient(s.REDIS_PORT, s.REDIS_URL, null);

var express = require('express');
var app = express();
app.listen(3000);

app.get('/', function(req, res){
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
        env: app.get('env'),
        redis : rClient.server_info.redis_version
    });
});

app.route('/cache')
  .get(function(req, res) {

  	rClient.get(req.query.key, function (err, reply) {
  		if (err != null) {
			 res.json({value : "", message : err}); 	//TODO : REFACTOR
			return;
  		} 
        res.json({status : 0, value : reply});	
    });
  })
  .post(function(req, res) {
  	
  	var key = req.query.key;
  	var value = req.query.value;
  	var ttl = req.query.ttl;

    rClient.set(key, value);
	rClient.expire(key, ttl);
    res.json({status : 0});
  })
  .delete(function(req, res) {
  	//TODO Exception
  	var key = req.query.key;
	 rClient.del(key);	
    res.json({status : 0});

  });

app.post('/cache/new', function (req, res) {
	res.json({Method : req.method});
});


rClient.on("error", function (err) {
    console.log("redis client error " + err);
    throw err;
});

rClient.on('ready', function () {
    console.log("redis client ready!");
});


var redisClient = redis.createClient();
redisClient.monitor(function (err, res) {
    console.log("Entering monitoring mode." + res);
});
redisClient.on("monitor", function (time, args) {
    console.log(time + ": " + util.inspect(args));
});


process.on('uncaughtException', function (err) {
    console.log('uncaughtException : ' + err);
});