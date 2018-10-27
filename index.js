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


app.use(express.static(__dirname + '/public'));

app.get('/tr1', function(req, res){
  var dname = 'acidity';
  var query=`query{
	symptom(where:{
    disease:{
      _like:"${dname}"
    }
  }){
    remedies
    requirements
  }
}`
  console.log("caught a disease");
  var selectOptions = {
  url: "https://infinitedebug.herokuapp.com/v1alpha1/graphql",
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Hasura-Access-Key': 'coolhack'
  },
  body: JSON.stringify({
      query
  })
}
request(selectOptions, function(error, response, body) {
  if (error) {
      console.log('Error from select request: ');
      console.log(error)
      res.status(500).json({
        'error': error,
        'message': 'Select request failed'
      });
  }
  console.log(body);
  var resy = JSON.parse(body);
    res.send(resy.data.symptom[0].remedies);
  })
})
app.post('/getdisease',function(req,res){
  if(req.body.queryResult.intent.displayName='GetDisease'){
    var dname= req.body.queryResult.parameters.disease;
    var query=`query{
    symptom(where:{
      disease:{
        _like:"${dname}"
      }
    }){
      remedies
      requirements
    }
  }`
    console.log("caught a disease");
    var selectOptions = {
    url: "https://infinitedebug.herokuapp.com/v1alpha1/graphql",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Access-Key': 'coolhack'
    },
    body: JSON.stringify({
        query
    })
  }
  request(selectOptions, function(error, response, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    }
    console.log(body);
    var resy = JSON.parse(body);
      res.send(resy.data.symptom[0].remedies);
    })
  }
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
