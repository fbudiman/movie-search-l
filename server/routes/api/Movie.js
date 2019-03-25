const fetch = require('node-fetch')
const generateWebAppURL = require('server/utils').generateWebAppURL

module.exports = (app) => {

    app.get('/movie', (req, res) => {
        const { id } = req.query
        const path = `/movie/${id}`
        const apiUrl = generateWebAppURL({ path })

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