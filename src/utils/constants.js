module.exports = {
    MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb://diabet_mongo:27017/diabet_notes',
    ELASTIC_URI: process.env.ELASTIC_URI || 'http://diabet_elastic:9200',
    DATABASE: {
        COLLECTION_NAMES: {
            USER: 'user',
            COMMENT: 'comment',
            VALUE: 'value'
        },
        USER_TYPES: {
            USER: 'user',
            DOCTOR: 'doctor',
            ADMIN: 'admin'
        }
    },
    SALT_GEN_FACTOR: process.env.SALT_GEN_FACTOR || 10,
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'ASOMENRANDOMLONGSTRINGWITHNUM123123'
}