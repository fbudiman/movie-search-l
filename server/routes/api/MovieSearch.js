const fetch = require('node-fetch')
const generateWebAppURL = require('server/utils').generateWebAppURL

module.exports = (app) => {

    app.get('/search/movie', (req, res) => {
        const { keywords, page } = req.body
        const apiUrl = generateWebAppURL(keywords, page)

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