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



// Static website hosting
app.use(express.static(__dirname + '/public'));

/**
Trial version, no longer needed
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
  var resM = resy.data.symptom[0].remedies;
  var response = {
    "fulfillmentText":""+resM,
    "fulfillmentMessages": [
      {
        "text": {
          "text":  [
              ""+resM
            ]
        }
      }
    ],
    "source": "https://dr-med.herokuapp.com/"
  }
  return res.json(response);

  })
})
**/


// Webhook integration for chat-bot

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

    var resy = JSON.parse(body);
    var resM = resy.data.symptom[0].remedies;
    var response = {
      "fulfillmentText":""+resM,
      "fulfillmentMessages": [
        {
          "text": {
            "text":  [
                ""+resM
              ]
          }
        }
      ],
      "source": "https://dr-med.herokuapp.com/"
    }
    return res.json(response);

    })
  }
  else if(req.body.queryResult.intent.displayName='FromSymp'){
    // To check if user entered Symptoms : then reeturn diseas based on them
    var sname = req.body.queryResult.parameters.symptoms;

    var query=`query{
    symptom{
      symptoms
      remedies
      }
    }`
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

    var resy = JSON.parse(body);
    var data = resy.data.symptom;
    var max = 0;
    var mesg = "Sorry I am unable to help you now, please tell me some more symptoms";

    for (var i = 0; i < data.length; i++) {
      var st = data[i].symptoms.split(",");
      var y = 0;
      for(var j=0; j<st.length; j++){
        for(var k=0; k<sname.length; k++){
          if(st[j]===sname[k]){
            y++;
          }
        }
      }
      if(y>max){
        max = y;
        mesg = data[i].remedies;
      }
    }
    var response = {
      "fulfillmentText":""+resM,
      "fulfillmentMessages": [
        {
          "text": {
            "text":  [
                ""+mesg
              ]
          }
        }
      ],
      "source": "https://dr-med.herokuapp.com/"
    }
    return res.json(response);

    })

  }
});

app.post('/givereward',function(req,res){
  console.log(req);
  var email= req.body.email;
  var query=`query{
  	rewards(where:{
      email:{
        _like:"${email}"
      }
    }){
      reward_points
    }
  }`
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

  var name = req.body.name;
  var points = req.body.amount/100;
  var resy = JSON.parse(body);
  var resM = resy.data.rewards;
  if(resM.length===0){
    console.log("Not present");
  }
  else{
    points = resM.data.rewards[0].reward_points + points;
  }
  console.log("Got till here");
 query=`mutation insert_rewards{
insert_rewards(
objects: [
{
name: "${name}",
email: "${email}",
reward_points: "${points}"
}
]
) {
returning {
id
reward_points
}
}
}`
    var seOptions = {
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
  request(seOptions, function(er, resp, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    }


    var rest = {
      "reward_points":""+points,
    }
    return res.json(rest);

    })

  })
})

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
