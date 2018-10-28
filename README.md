# Dr. Medico
Our idea is to build a bot which interacts with user in real time and suggests medical remedies based on symptoms or their disease.

Also we have these products listed on our website so that the user can easily buy the requirements if any.
It can also directly talk to the user using its voice simulation while being used with Google Home/Assistant or Amazon alexa.

## Live demo
Our product is hosted on a live tech domain feel free to give us a visit at [www.infinitedebug.tech](www.infinitedebug.tech)

## Technology Used
We are using **Hasura GraphQL Engine** as our database service, which reduces the number of database calls significantly by allowing multiple sub-queries.
We have our backed service based on Node.js hosted on a heroku droplet.
For our bot we are using Dialogflow to enable the bot to understand the user better.
The bot is also converted to an skill to be readily able to work with Google Home/Assistant or Amazon alexa.

## Running it locally
### Pre-requirements for local deployment
1. Node.js
2. npm/yarn

You can run the project locally, however the bot and the database will not be working locally.
```
$ git clone https://github.com/hackabit18/Infinite_Debug.git
$ git checkout master
$ yarn install
$ node index.js
```

## Deploying it on a heroku droplet/dyanno
Follow the following steps and you will be able to deploy it to a new heroku dyanno of your own.
```
$ git clone https://github.com/hackabit18/Infinite_Debug.git
$ git checkout master
$ yarn install
$ heroku create
$ git push heroku master
```

You may then just run `heroku open` to open the page directly.
## Found a bug?
Feel free to open an issue or drop me a mail at divyanshukumarg@gmail.com

## License
All of the code is fully open source, so you can go ahead and try to integrate with your project too.

______________________________________________________________________________________________________________
Happy Coding

______________________________________________________________________________________________________________

Team Infinite Debug
