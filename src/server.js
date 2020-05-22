const express = require('express')

const { notFoundHandler, errorHandler } = require('./utils/middlewares')
const mongoConnect = require('./database/connection').connect
const pingElastic = require('./elastic/elastic').ping

Promise.all([
    mongoConnect(),
    pingElastic()
]).then(() => {
    const app = express()

    app.use(notFoundHandler)
    app.use(errorHandler)

    app.listen(process.env.PORT || 9000, () => console.log(`App listening on ${process.env.PORT || 9000}`))
}).catch(err => console.error('Failed to connect to elastic or mongo', err))

