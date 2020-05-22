const express = require('express')

const mongoConnect = require('./database/connection').connect
const pingElastic = require('./elastic/elastic').ping

Promise.all([
    mongoConnect(),
    pingElastic()
]).then(() => {
    const app = express()

    app.listen(process.env.PORT || 9000, () => console.log(`App listening on ${process.env.PORT || 9000}`))
}).catch(err => console.error('Failed to connect to elastic or mongo', err))

