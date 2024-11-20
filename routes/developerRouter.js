const { Router } = require('express')
const developerController = require('../controllers/developerController')
const developerRouter = Router()

developerRouter.get('/', developerController.getDevelopers)
developerRouter.get('/:developer', developerController.getDeveloper)

module.exports = developerRouter

