CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  token_version INTEGER,
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'UTC'),
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now() AT TIME ZONE 'UTC';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON rooms
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();