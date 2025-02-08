const pool = require("./pool");

async function insertMessage(data) {
    await pool.query("INSERT INTO messages (username, text, date) VALUES ($1, $2, $3)", 
      [data.username, data.text, data.date]);
    console.log('message inserted!')
}

// Helping functions
   async function getGenreId(genreName) {
     const {rows} = await pool.query('SELECT id FROM genres WHERE genre = $1', [genreName])
     return rows
   }

   async function getDeveloperId(developerName) {
    const {rows} = await pool.query('SELECT id FROM developers WHERE developer = $1', [developerName])
    return rows
  }
// Main functions

async function getGames() {
  const {rows} = await pool.query('SELECT game FROM games')
  return rows
}

async function getGame(game) {
  const {rows} =  await pool.query(`
    SELECT game, release_date, developer, genre, games.id
    FROM games 
    LEFT JOIN games_genres ON games.id = games_genres.game_id
    LEFT JOIN genres ON genres.id = games_genres.genre_id
    LEFT JOIN games_developers ON games.id = games_developers.game_id
    LEFT JOIN developers ON developers.id = games_developers.developer_id
    WHERE game = ($1)
      `,[game])
    return rows
}

async function getGenres() {
    const {rows} =  await pool.query("SELECT genre FROM genres")
    return rows
}

async function getGamesInGenre(genre) {
  
  const {rows} =  await pool.query(`
  SELECT game, release_date, developer, genre, genre_id
  FROM games 
  JOIN games_genres ON games.id = games_genres.game_id
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
  SELECT game, release_date, developer, genre, developer_id
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

async function updateGenre(genreId,newGenre) {
  await pool.query(`UPDATE genres SET genre = $1 WHERE id = $2`, [newGenre, genreId])
}

async function updateDeveloper(developerId,newDeveloper) {
  await pool.query(`UPDATE developers SET developer = $1 WHERE id = $2`, [newDeveloper, developerId])
}

//Add updateGame function

async function updateGame(data) {
  // await pool.query('UPDATE games SET game = $1, release_date = $2 WHERE id = $3', [data.gameName, data.releaseDate, data.gameId])
  // await pool.query('DELETE FROM games_genres WHERE game_id = $!', [data.gameId])
  
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

  // delete and replace current junction table game rows
  await pool.query('DELETE FROM games_genres WHERE game_id = $1', [data.gameId])
  await pool.query('DELETE FROM games_developers WHERE game_id = $1', [data.gameId])

  for (const genreId of genreIds) {
    await pool.query('INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)', [data.gameId, genreId])
  }
  for (const developerId of developerIds) {
    await pool.query(`INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)`, [data.gameId,developerId])
  }

}

async function deleteGame(data) {
  // await pool.query('DELETE FROM table_name WHERE condition;')
}

async function deleteGenre(genreId) {
  await pool.query('DELETE FROM games_genres WHERE genre_id = $1', [genreId])
  await pool.query('DELETE FROM genres WHERE id = $1', [genreId])
}

async function deleteDeveloper(developerId) {
  await pool.query('DELETE FROM games_developers WHERE developer_id = $1', [developerId])
  await pool.query('DELETE FROM developers WHERE id = $1', [developerId])
}


module.exports = {
  insertMessage,
  getGenreId,
  getDeveloperId,
  getGames,
  getGame,
  getGenres,
  getGamesInGenre,
  getDevelopers,
  getGamesFromDeveloper,
  insertGame,
  insertGenre, 
  insertDeveloper,
  updateGenre,
  updateDeveloper,
  updateGame,
  deleteGenre,
  deleteDeveloper
};
