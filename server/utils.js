const url = require('url')
const config = require('./config')

module.exports = {
    generateWebAppURL: ({ keywords=null, page=null, id=null }={}) => {
        const baseUrlConfig = config.baseUrl
        const APIkey = config.APIkey
        const requestQuery = { api_key: APIkey }

        if (!!keywords)
            requestQuery.query = keywords

        if (!!page)
            requestQuery.page = page

        if (!!id)
            requestQuery.movie_id = id

        return url.format({
            protocol: baseUrlConfig.protocol,
            hostname: baseUrlConfig.hostname,
            pathname: baseUrlConfig.path,
            query: requestQuery
        })
    },
}