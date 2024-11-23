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

async function insertGame(data) {

  console.log(data)

  // Add row to game table and get id of new row with RETURNING
  const {rows} = await pool.query("INSERT INTO games (game, release_date) VALUES ($1, $2) RETURNING *", 
      [data.gameName, data.releaseDate]);
  const gameId = rows[0].id;

  // insert into genres table and get ids
  const genreIds = []
  for (const genre of data.genres) {
    let id;
    const {rows} =  await pool.query(`SELECT * FROM genres WHERE genre ILIKE $1`, [genre])
    if (rows.length > 0) {
      id = rows[0].id
    } else {
      const {rows} = await pool.query("INSERT INTO genres (genre) VALUES ($1) RETURNING *", [genre]);
      id = rows[0].id
    }
    genreIds.push(id)
  }
  

  // insert into developers table and get ids
  const developerIds = []
  for (const developer of data.developers) {
    let id;
    const { rows } = await pool.query(`SELECT * FROM developers WHERE developer ILIKE $1`, [developer]);
    if (rows.length > 0) {
      id = rows[0].id
    } else {
      const {rows} = await pool.query("INSERT INTO developers (developer) VALUES ($1) RETURNING *", [developer]);
      id = rows[0].id
    }
    developerIds.push(id)
  }
  console.log(developerIds)
  
  // insert into games_genres and games_developers
  for (const genreId of genreIds) {
    await pool.query(`INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)`, [gameId,genreId])
  }
  for (const developerId of developerIds) {
    await pool.query(`INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)`, [gameId,developerId])
  }

}

async function insertGenre(genre) {
  await pool.query(`INSERT INTO genres (genre) VALUES ($1)`, [genre])
}

async function insertDeveloper(developer) {
  await pool.query(`INSERT INTO developers (developer) VALUES ($1)`, [developer])
}


module.exports = {
  insertMessage,
  getGenres,
  getGamesInGenre,
  getDevelopers,
  getGamesFromDeveloper,
  insertGame,
  insertGenre, insertDeveloper
};
