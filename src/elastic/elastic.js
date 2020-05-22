const { Client } = require('@elastic/elasticsearch')

const { ELASTIC_URI } = require('../utils/constants')

const client = new Client({ node: ELASTIC_URI })


module.exports = {
    ping: () => client.ping()
}