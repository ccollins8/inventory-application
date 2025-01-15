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

module.exports = {
    getGames,
    getGame
}