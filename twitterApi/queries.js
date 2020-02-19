// IMPORT REQUIRED MODULES:
const services = require('./services/services');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;


// DEFINE ENDPOINT CALLBACKS:
//get all tweets:
const getTweets = async (request, response) => {
  try {
    const tweets = await services.getAllTweets();
    return response.status(200).json({
      error: null,
      result: tweets
    });
  }
  catch(error) {
    console.log(error);
    response.status(404).json({
      error: 'Error - Could not load tweets',
      result: null
    });
  }
};

//get tweets by user:
const getTweetsByUser = async (request, response) => {
  try {
    const id = +request.params.id;
    const userTweets = await services.getTweetsByUserId(id);
    response.status(200).json({
      error: null,
      result: userTweets
    });
  } 
  catch (error) {
    console.log(error);
    response.status(404).json({
      error: `Error - Could not find tweets`,
      result: null
    });
  }
};

//get tweets by tweet id:
const getTweetById = async (request, response) => {
  try {
    const id = +request.params.id;
    const userTweet = await services.getTweetById(id);
    response.status(200).json({
      error: null,
      result: userTweet
    });
  } 
  catch (error) {
    console.log(error);
    response.status(404).json({
      error: `Error - Could not find tweets`,
      result: null
    });
  }
};

//post new tweet:
const postTweet = async (req, res) => {
  try {
    const { id } = req.user;
    const { message } = req.body;

    const newTweet = await services.createTweet(message, id);
    res.status(200).json({
      error: null,
      result: newTweet
    });
  } 
  catch (error) {
    console.log(error);
    req.status(404).json({
      error: `Error - Could not post tweet from user with`,
      result: null
    });
  }
}

//edit tweet
const editTweet = async (req, res) => {
  const { message, id 
  } = req.body;

  const updateTweet = await services.editTwitterMessage({
    message,
    id
  });

  res.send(updateTweet);
}

// delete tweet


const deleteTweet = async (req, res) => {
  const { id } = req.body;
  console.log(req.body)
  
  await services.deleteTweet( id )
  res.send({ id });
};

//get user by handle
const getUserByHandle = async (req, res) => {
  try {
    const { handle, password } = req.body;
    const user = await services.getUserByHandle(handle);
  
    if(!user) {
      return res.status(401).send({ error: 'Unknown user' });
    }
  
    if(user.password !== password) {
      return res.status(401).send({ error: 'Wrong password' });
    }
  
    const token = jwt.sign({
      id: user.id,
      handle: user.handle,
      name: user.name,
    }, new Buffer(secret, 'base64'));
  
    res.status(200).json({
      result: token,
      error: null 
    });
  }
  catch(error) {
    console.log(error);
    res.status(404).json({
      error: `Error - Could not create auth-key for user`,
      result: null
    });
  }
}

//check session token
const checkSessionToken = (req, res) => {
  res.send({
    message: 'You are authenticated'
  });
}

//post new user
const postUser = async (req, res) => {
  const { name, handle, password } = req.body;
  try {
    const user = await services.getUserByHandle(handle);
    
    if (user) {
      throw new Error('Username already in use');
    }

    const newUser = await services.createUser({ 
      name, 
      handle, 
      password
    });

    res.status(200).json({
      error: null,
      result: newUser
    });
  } catch(error) {
    console.log(error);
    res.status(401).json({
      error: error.message,
      result: null
    });
  }
}


// EXPORT MODULES TO SERVER:
module.exports = {
  getTweets,
  getTweetsByUser,
  postTweet,
  getUserByHandle,
  checkSessionToken,
  postUser,
  getTweetById,
  editTweet,
  deleteTweet
};