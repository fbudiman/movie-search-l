const fetch = require('node-fetch')
const generateWebAppURL = require('server/utils').generateWebAppURL

module.exports = (app) => {

    app.get('/movie/popular', (req, res) => {
        const apiUrl = generateWebAppURL()

        console.log('apiUrl', apiUrl)

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                res.send({ data })
            })
            .catch(err => {
                res.redirect('/error')
            })
    })
}