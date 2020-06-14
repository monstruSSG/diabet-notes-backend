const express = require('express')
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

const { notFoundHandler, errorHandler, authHandler } = require('./utils/middlewares')
const mongoConnect = require('./database/connection').connect
const pingElastic = require('./elastic/elastic').ping
const { users, auth, values, plan, reports } = require('./api');

Promise.all([
    mongoConnect(),
    pingElastic()
]).then(() => {
    const app = express()

    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use(cors({
        origin: '*'
    }))

    app.use('/files', express.static('files'))
    app.use('/auth', auth)
    app.use(authHandler)

    app.use('/users', users)
    app.use('/auth/logged', (req, res) => res.send({}))
    app.use('/plan', plan)
    app.use('/values', values)
    app.use('/reports', reports)

    

    app.use(notFoundHandler)
    app.use(errorHandler)

    app.listen(process.env.PORT || 9000, () => console.log(`App listening on ${process.env.PORT || 9000}`))
}).catch(err => console.error('Failed to connect to elastic or mongo', err))

