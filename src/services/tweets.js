const API_URL = '/api';

export const getTweets = () => {
  return fetch(`${API_URL}/tweets`)
  .then((res) => res.json());
}


export const postTweet = message => {
  return fetch(`${API_URL}/tweets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('twitter_clone_token'),
    },
    body: JSON.stringify({ message })
  })
  .then((res) => res.json());
}

export const editTweet = async tweet => {
   
  const editPromise = await fetch(`${API_URL}/editTweet/${tweet.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tweet)
  });
  return editPromise;
}

export const getTweetById = async id => {
  const response = await fetch(`${API_URL}/tweet/${id}`)
  const { error, result } = await response.json();
  return result;
}

export const deleteTweet = async id => {
  const deletePromise = await fetch(`${API_URL}/editTweet`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  })
  
  return deletePromise;
}

