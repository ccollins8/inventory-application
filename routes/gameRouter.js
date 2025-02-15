const { Router } = require('express')
const gameController = require('../controllers/gameController')
const gameRouter = Router()

gameRouter.get('/', gameController.getGames)
gameRouter.get('/:game', gameController.getGame)

gameRouter.post('/create-game', gameController.createGamePost)
gameRouter.post('/game/update-game',gameController.updateGamePost)

gameRouter.post('/game/delete', gameController.deleteGame)
module.exports = gameRouter

