const db = require('../db/queries')

async function getGenres(req, res) {
    const genres = await db.getGenres();
    res.render('genres', {genres})
}

async function getGenre(req, res) {
    const games = await db.getGamesInGenre(req.params.genre);
    res.render('genre', {games})
}

async function createGenrePost(req, res) {
    const genre = req.body.genre
    await db.insertGenre(genre)
    res.redirect('/genres')
}

async function updateGenrePost(req, res) {
    const genreId = req.body.genreId;
    const newGenre = req.body.newGenre;

    await db.updateGenre(genreId, newGenre);
    res.redirect('/genres')
}

module.exports = {
    getGenres,
    getGenre,
    createGenrePost,
    updateGenrePost
}