const db = require('../db/queries');

async function getDevelopers(req, res) {
    const developers = await db.getDevelopers();
    console.log(developers)
    res.render('developers', {developers})
}

async function getDeveloper(req, res) {
    const games = await db.getGamesFromDeveloper(req.params.developer);
    console.log(games)
    res.render('developer', {games})
}

async function createDeveloperPost(req,res) {
    const developer = req.body.developer
    console.log(developer)
    await db.insertDeveloper(developer)
    res.redirect('/developers')
}

module.exports = {
    getDevelopers,
    getDeveloper,
    createDeveloperPost
}