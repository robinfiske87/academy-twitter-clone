// IMPORT REQUIRED MODULES:
//const Pool = require('pg').Pool;
const { Pool } = require('pg');


// DEFINE DATABASE:
const pool = new Pool({
  user: 'robin',
  host: 'localhost',
  database: 'twitterclone',
  password: 'javascript',
  port: 5432
});

// SERVICE FUNCTIONS:
//get all tweets:
const getAllTweets = async () => {
  const queryString=`
    SELECT 
      t.id, 
      t.message, 
      t.created_at, 
      u.name, 
      u.handle
    FROM 
      tweets AS t 
    INNER JOIN users AS u ON  
      (u.id = t.user_id)
    ORDER BY t.id DESC
    ;  
  `;
  const { rows: tweets } = await pool.query(queryString);
  return tweets;
}

const getTweetsByUserId = async userId => {
  const queryString=`
    SELECT 
      t.id, 
      t.message, 
      t.created_at, 
      u.name, 
      u.handle
    FROM 
      tweets AS t 
    INNER JOIN users AS u ON  
      (u.id = t.user_id)
    WHERE 
      t.user_id = $1
  `;

  const { rows: userTweets }  = await pool.query(queryString, [userId]);
  return userTweets;
}
const getTweetById = async id => {
  const queryString=`
    SELECT *
    FROM 
      tweets AS t 
    WHERE 
      t.id = $1
  `;

  const { rows }  = await pool.query(queryString, [id]);
  return rows[0];
}

const getUserByHandle = async handle => {
  const response = await pool.query(`
    SELECT * 
    FROM users 
    WHERE handle = $1
  `, [handle]);
  return response.rows[0];
}

const createTweet = (message, userId) => {
  return pool.query(`
    INSERT INTO tweets
      (message, user_id)
    VALUES
      ($1, $2)
    RETURNING *
  `, [message, userId])
  .then(({ rows }) => rows)
}

const editTwitterMessage = async tweetData => {
  const { rows } = await pool.query(
    `UPDATE tweets SET
    message = $1
    WHERE id = $2
    RETURNING *
    `, [tweetData.message, tweetData.id]
  );
  return rows[0]
}

const createUser = ({ name, handle, password }) => {
  return pool.query(`
    INSERT INTO users
      (name, handle, password)
    VALUES
      ($1, $2, $3)
    RETURNING handle, id
  `, [name, handle, password])
  .then(({rows}) => rows);
}

const deleteTweet = async (id) => {
  const { rows } = await pool.query(`
  DELETE FROM
    tweets
  WHERE
    id = $1
    `, [id]);

  return rows[0]
}

// EXPORT MODULE TO QUERIES:
module.exports = {
  getAllTweets,
  getTweetsByUserId,
  getUserByHandle,
  createTweet,
  createUser,
  getTweetById,
  editTwitterMessage,
  deleteTweet
}