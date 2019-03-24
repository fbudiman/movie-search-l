const url = require('url')
const config = require('./config')

module.exports = {
    generateWebAppURL: (keywords, page) => {
        const baseUrlConfig = config.baseUrl
        const APIkey = config.APIkey
        const requestQuery = { 
            api_key: APIkey,
            query: keywords,
            page
        }

        return url.format({
            protocol: baseUrlConfig.protocol,
            hostname: baseUrlConfig.hostname,
            pathname: baseUrlConfig.path,
            query: requestQuery,
        })
    },
}