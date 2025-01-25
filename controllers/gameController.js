const db = require('../db/queries');

async function getGames(req, res) {
    const games = await db.getGames()
    res.render('games', {games})
}

async function getGame(req, res) {
    const game = await db.getGame(req.params.game)
    // console.log(game)
    res.render('game', {game})
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

async function updateGamePost(req, res) {
    const data = req.body

    data.genres = data.genres.split(',');
    data.genres = data.genres.map(genre => genre.trim())

    data.developers = data.developers.split(',');
    data.developers = data.developers.map(developer => developer.trim())

    await db.updateGame(data)



}

module.exports = {
    getGames,
    getGame,
    createGamePost,
    updateGamePost
}