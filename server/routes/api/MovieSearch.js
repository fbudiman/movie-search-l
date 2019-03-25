const fetch = require('node-fetch')
const generateWebAppURL = require('server/utils').generateWebAppURL

module.exports = (app) => {

    app.get('/search', (req, res) => {
        const { keywords, page } = req.query
        const path = '/search/movie'
        const apiUrl = generateWebAppURL({ path, keywords, page })

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.redirect('/error')
            })
    })
}