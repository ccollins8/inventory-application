const db = require('../db/queries')

async function getIndex(req, res) {
    res.render('index')
}

async function getGenres(req, res) {
    res.render('genres')
}

async function createGamePost(req, res) {
    const data = req.body;
    
    //convert genres and developers from strings to arrays and trim.
    if (typeof data.genres === 'string') {
        data.genres = data.genres.split(',');
        data.genres = data.genres.map(genre => genre.trim())

        data.developers = data.developers.split(',');
        data.developers = data.developers.map(developer => developer.trim())
      }
    const capitalizedGenres = data.genres.map(genre => genre.charAt(0).toUpperCase() + genre.slice(1));
    const capitalizedDevelopers = data.developers.map(developer => developer.charAt(0).toUpperCase() + developer.slice(1));
    
    data.genres = capitalizedGenres
    data.developers = capitalizedDevelopers

    await db.insertGame(data)
    
    res.redirect('../')
}

module.exports = {
    getIndex,
    getGenres,
    createGamePost
}