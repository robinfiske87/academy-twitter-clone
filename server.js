require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./twitterApi/queries');
const { authenticate } = require('./twitterApi/services/middleware');

const app = express();
const port = process.env.PORT || 3456;


// DEFINE MIDDLEWARE:

//log requests:
app.use((req, res, next) => {
  console.log(`New request type ${req.method} on ${req.url}`)
  next();
});

//cors middleware
app.use(cors());
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serve build folder on static request
app.use(express.static('build'));


//DEFINE API ROUTER:
const api = express();

api.get('/session', authenticate, db.checkSessionToken);
api.post('/session', db.getUserByHandle);
api.get('/tweets', db.getTweets);
api.get('/tweets/:id', db.getTweetsByUser);
api.get('/tweet/:id', db.getTweetById);
api.post('/tweets', authenticate, db.postTweet); 
api.post('/users', db.postUser);
api.put('/editTweet/:id', db.editTweet);
api.delete('/editTweet', db.deleteTweet);


app.use('/api', api);


//LISTEN TO PORT:
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});