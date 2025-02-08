const { Router } = require('express')
const developerController = require('../controllers/developerController')
const developerRouter = Router()

developerRouter.get('/', developerController.getDevelopers)
developerRouter.get('/:developer', developerController.getDeveloper)

developerRouter.post('/create-developer', developerController.createDeveloperPost)
developerRouter.post('/developer/update-developer',developerController.updateDeveloperPost)

developerRouter.post('/developer/delete', developerController.deleteDeveloper)

module.exports = developerRouter

