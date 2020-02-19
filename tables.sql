CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  handle TEXT,
  password TEXT
);

CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  message TEXT,
  user_id INTEGER
);

INSERT INTO users
  (name, handle, password )
VALUES
  ('Pål-christian By', 'ChristyB', '6969'),
  ('Donald Trumph', 'potus', '4321'),
  ('Robin R Fiske', 'robinrf', '1234');

INSERT INTO tweets
  (message, user_id)
VALUES
  ('Hvordan fungerer dette?', 1),
  ('I Looooove America!', 2),
  ('I Rock', 2),
  ('Ping pong', 3)


SELECT t.id, t.message, t.created_at, u.name, u.handle
FROM tweets AS t 
INNER JOIN users AS u ON  
  (u.id = t.user_id);
