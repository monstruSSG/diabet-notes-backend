module.exports = {
    MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb://diabet_mongo:27017/diabet_notes',
    ELASTIC_URI: process.env.ELASTIC_URI || 'http://diabet_elastic:9200'
}