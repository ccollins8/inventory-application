const { Router } = require('express')
const genreController = require('../controllers/genreController')
const genreRouter = Router()

genreRouter.get('/', genreController.getGenres)
genreRouter.get('/:genre', genreController.getGenre)

genreRouter.post('/create-genre', genreController.createGenrePost)
genreRouter.post('/genre/update-genre',genreController.updateGenrePost)

genreRouter.post('/genre/delete', genreController.deleteGenre)
module.exports = genreRouter

