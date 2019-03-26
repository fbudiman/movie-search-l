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

    app.get('/similar', (req, res) => {
    	const { id } = req.query
    	const path = `movie/${id}/similar`
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