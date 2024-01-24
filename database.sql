CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- génerer des ids
CREATE DATABASE testtechn;

CREATE TABLE users (user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),user_name TEXT NOT NULL, user_email TEXT NOT NULL, user_password TEXT NOT NULL);

SELECT * FROM users;

-- psql -U postgres 
--\c testtechn 
--\dt



