const { Router } = require('express')
const genreController = require('../controllers/genreController')
const genreRouter = Router()

genreRouter.get('/', genreController.getGenres)
genreRouter.get('/:genre', genreController.getGenre)

module.exports = genreRouter

