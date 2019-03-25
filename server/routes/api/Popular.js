const fetch = require('node-fetch')
const generateWebAppURL = require('server/utils').generateWebAppURL

module.exports = (app) => {

    app.get('/popular', (req, res) => {
    	const { page } = req.query
    	const path = '/movie/popular'
        const apiUrl = generateWebAppURL({ path, page })

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