const { Router } = require('express')
const developerController = require('../controllers/developerController')
const developerRouter = Router()

developerRouter.get('/', developerController.getDevelopers)
developerRouter.get('/:developer', developerController.getDeveloper)

developerRouter.post('/create-developer', developerController.createDeveloperPost)

module.exports = developerRouter

