const API_URL = '/api';

export const postUser = ({ name, handle, password, repeatPw }) => {
  if (password !== repeatPw) {
    throw new Error('Password and repeat password is not equal');
  }
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, handle, password })
  })
  .then((res) => res.json());
}