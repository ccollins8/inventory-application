require('dotenv').config()

const { Client } = require("pg");

console.log(process.env.DB_HOST)
console.log(process.env.DB_NAME)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_USER)
console.log(process.env.DB_PORT)

const SQL = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game VARCHAR ( 255 ),
  release_date VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS developers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  developer VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS games_genres (
  game_id INTEGER REFERENCES games(id),
  genre_id INTEGER REFERENCES genres(id),
  PRIMARY KEY (game_id, genre_id)
);

CREATE TABLE IF NOT EXISTS games_developers (
  game_id INTEGER REFERENCES games(id),
  developer_id INTEGER REFERENCES developers(id),
  PRIMARY KEY (game_id, developer_id)
);

INSERT INTO genres (genre)
VALUES
  ('Action'),
  ('RPG'),
  ('Strategy'),
  ('Adventure');

INSERT INTO developers (developer)
VALUES
  ('Naughty Dog'),
  ('FromSoftware'),
  ('Bethesda Game Studios'),
  ('CD Projekt Red');

INSERT INTO games (game, release_date)
VALUES
  ('The Last of Us', '2013-06-14'),
  ('Elden Ring', '2022-02-25'),
  ('The Elder Scrolls V: Skyrim', '2011-11-11'),
  ('The Witcher 3: Wild Hunt', '2015-05-19');

INSERT INTO games_genres (game_id, genre_id)
VALUES
  (1, 1),
  (1, 4),
  (2, 1),
  (2, 3),
  (3, 2),
  (3, 4),
  (4, 1),
  (4, 2),
  (4, 4);

INSERT INTO games_developers (game_id, developer_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      host: process.env.DB_HOST, // or wherever the db is hosted
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT // The default port
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done')
}

main()