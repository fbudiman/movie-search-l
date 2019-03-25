const url = require('url')
const config = require('./config')

module.exports = {
    generateWebAppURL: ({ path='', keywords=null, page=null }={}) => {
        const baseUrlConfig = config.baseUrl
        const APIkey = config.APIkey
        const requestQuery = { api_key: APIkey }

        if (!!keywords)
            requestQuery.query = keywords

        if (!!page)
            requestQuery.page = page

        return url.format({
            protocol: baseUrlConfig.protocol,
            hostname: baseUrlConfig.hostname,
            pathname: path,
            query: requestQuery
        })
    },
}