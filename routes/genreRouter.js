const { Router } = require('express')
const genreController = require('../controllers/genreController')
const genreRouter = Router()

genreRouter.get('/', genreController.getGenres)
genreRouter.get('/:genre', genreController.getGenre)

genreRouter.post('/create-genre', genreController.createGenrePost)

module.exports = genreRouter

