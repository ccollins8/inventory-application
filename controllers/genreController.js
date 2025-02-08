const db = require('../db/queries')

async function getGenres(req, res) {
    const genres = await db.getGenres();
    res.render('genres', {genres})
}

async function getGenre(req, res) {
    const genreName = req.params.genre
    const genreId = (await db.getGenreId(genreName))[0].id
    const games = await db.getGamesInGenre(req.params.genre);
    // console.log(genreId)
    res.render('genre', {games,genreName, genreId})
}

async function createGenrePost(req, res) {
    const genre = req.body.genre
    await db.insertGenre(genre)
    res.redirect('/genres')
}

async function updateGenrePost(req, res) {
    console.log(req.body)
    const genreId = req.body.genreId;
    const newGenre = req.body.newGenre;

    await db.updateGenre(genreId, newGenre);
    res.redirect('/genres')
}

async function deleteGenre(req, res) {
    //could do with parameters i believe or like how i did update
    await db.deleteGenre(req.body.genreId)
    res.redirect('/genres')
}

module.exports = {
    getGenres,
    getGenre,
    createGenrePost,
    updateGenrePost,
    deleteGenre
}