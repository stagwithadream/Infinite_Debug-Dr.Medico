var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var alertnode = require('alert-node');
var router = express.Router();


require('request-debug')(request);
var port = process.env.PORT || 8888;
var fetch = require('fetch');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var apiRouters = require('./apiRouters');

app.use(express.static(__dirname + '/public'));

app.post('/getdisease',function(req,res){
  console.log(req.body);
  res.end("yes");
});

app.use('/api', apiRouters);

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
