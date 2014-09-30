"use strict";

var os = require('os');
var util = require("util");
var redis = require("redis");
var config = require("./config");
var rClient = redis.createClient();
var express = require('express');
var errorhandler = require('errorhandler')

var app = express();
app.listen(3000);

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
 
  var redisClient = redis.createClient();
  redisClient.monitor(function (err, res) {
    console.log("Entering monitoring mode." + res);
  });
  redisClient.on("monitor", function (time, args) {
    console.log(time + ": " + util.inspect(args));
  });
} 

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
  		if (err != undefined) {
        res.json({status : -1, message : err.toString()}); 	//TODO : REFACTOR
  		} else {
        res.json({status : 0, value : reply});  
      }
    });

  })

  .post(function(req, res) {
  	
  	var key = req.query.key;
  	var value = req.query.value;
  	var ttl = req.query.ttl || config.ttl;
    
    rClient.SETEX(key, ttl, value);
    responseFinish(res);
  })

  .delete(function(req, res) {
    var key = req.query.key;
    rClient.del(key);	
    responseFinish(res);
  });

app.get('/caches', function (req, res) {

  var keys = req.query.key;
  var len = keys.length;

  rClient.mget(req.query.key, function (err, reply) {
      if (err != null) {
        res.json({status : -1, message : err.toString()});   //TODO : REFACTOR
      } else {
        var data = [];
        for (var i = 0; i < len; i++){
          data.push( {key: keys[i], value: reply[i]});
        }
        res.json({status : 0, list : data});  
      } 
    });
});

var responseFinish = function(res){
    if (redisConfig.lock) {
      res.json({status : -1, message : redisConfig.message});
    }else{
      res.json({status : 0});
    }
}

var redisConfig = {
  lock : false,
  message : ""
} 

rClient.on('ready', function () {
  redisConfig.lock = false;
  redisConfig.message = "";

  console.log("redis client ready!");
});

rClient.on("error", function (err) {
  redisConfig.lock = true;
  redisConfig.message = err.toString();

  console.log("redis client error " + err);
  throw err;
});


process.on('uncaughtException', function (err) {
    console.log('uncaughtException : ' + err);
});

