const db = require('../db/queries')

async function getIndex(req, res) {
    res.render('index')
}

async function getGenres(req, res) {
    res.render('genres')
}

module.exports = {
    getIndex,
    getGenres
}