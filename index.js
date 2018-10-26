var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var alertnode = require('alert-node');
require('request-debug')(request);
var port = process.env.PORT || 8888;
var fetch = require('fetch');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
