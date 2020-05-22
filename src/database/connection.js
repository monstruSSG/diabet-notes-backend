const mongoose = require('mongoose')

const { MONGO_DB_URI } = require('../utils/constants')

module.exports = {
    connect: () => mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true })
}