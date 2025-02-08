const db = require('../db/queries');

async function getDevelopers(req, res) {
    const developers = await db.getDevelopers();
    console.log(developers)
    res.render('developers', {developers})
}

async function getDeveloper(req, res) {
    const developerName = req.params.developer
    const developerId = (await db.getDeveloperId(developerName))[0].id
    const games = await db.getGamesFromDeveloper(developerName);
    console.log(games)
    res.render('developer', {games,developerName,developerId})
}

async function createDeveloperPost(req,res) {
    const developer = req.body.developer
    console.log(developer)
    await db.insertDeveloper(developer)
    res.redirect('/developers')
}

async function updateDeveloperPost(req, res) {
    const developerId = req.body.developerId;
    const newDeveloper = req.body.newDeveloper;
    console.log(req.body)

    // await db.updateDeveloper(developerId, newDeveloper);
    res.redirect('/developers')
}

async function deleteDeveloper(req, res) {
    await db.deleteDeveloper(req.body.developerId)
    res.redirect('/developers')
}

module.exports = {
    getDevelopers,
    getDeveloper,
    createDeveloperPost,
    updateDeveloperPost,
    deleteDeveloper
}