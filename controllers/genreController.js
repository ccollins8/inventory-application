const db = require('../db/queries')

async function getGenres(req, res) {
    const genres = await db.getGenres();
    res.render('genres', {genres})
}

async function getGenre(req, res) {
    const games = await db.getGamesInGenre(req.params.genre);
    console.log(games)
    res.render('genre', {games})
}

module.exports = {
    getGenres,
    getGenre
}