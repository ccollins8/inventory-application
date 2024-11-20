const pool = require("./pool");

async function insertMessage(data) {
    await pool.query("INSERT INTO messages (username, text, date) VALUES ($1, $2, $3)", 
      [data.username, data.text, data.date]);
    console.log('message inserted!')
}

async function getGenres() {
    const {rows} =  await pool.query("SELECT genre FROM genres")
    return rows
}

async function getGamesInGenre(genre) {
  
  const {rows} =  await pool.query(`
  SELECT game, release_date, developer, genre
  FROM games JOIN games_genres ON games.id = games_genres.game_id
  JOIN genres ON genres.id = games_genres.genre_id
  JOIN games_developers ON games.id = games_developers.game_id
  JOIN developers ON developers.id = games_developers.developer_id
  WHERE genre = ($1)
    `,[genre])
  return rows
}

async function getDevelopers() {
  const {rows} =  await pool.query("SELECT developer FROM developers")
  return rows
}

async function getGamesFromDeveloper(developer) {
  
  const {rows} =  await pool.query(`
  SELECT game, release_date, developer, genre
  FROM games JOIN games_genres ON games.id = games_genres.game_id
  JOIN genres ON genres.id = games_genres.genre_id
  JOIN games_developers ON games.id = games_developers.game_id
  JOIN developers ON developers.id = games_developers.developer_id
  WHERE developer = ($1)
    `,[developer])
  return rows
}

module.exports = {
  insertMessage,
  getGenres,
  getGamesInGenre,
  getDevelopers,
  getGamesFromDeveloper
};
