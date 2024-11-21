const { Router } = require('express')
const indexController = require('../controllers/indexController')
const indexRouter = Router()

indexRouter.get('/', indexController.getIndex)

indexRouter.post('/create-game', indexController.createGamePost)

module.exports = indexRouter

