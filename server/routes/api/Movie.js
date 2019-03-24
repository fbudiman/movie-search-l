const fetch = require('node-fetch')
const generateWebAppURL = require('server/utils').generateWebAppURL

module.exports = (app) => {

    app.get('/movie', (req, res) => {
        const { id } = req.body
        const apiUrl = generateWebAppURL({ id })

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