const STATUS_CODES = require('http-status-codes')
const jwt = require('jsonwebtoken')

const { TOKEN_SECRET } = require('../utils/constants')

module.exports = {
    authHandler: (req, res, next) => {
        let authHeader = req.headers.authorization;

        if (!authHeader) {
            let error = new Error('Unauthorized')
            error.status = STATUS_CODES.UNAUTHORIZED

            throw error
        }

        let [bearer, token] = req.headers.authorization.split(' ')

        if (bearer !== 'Bearer') {
            let error = new Error('Unauthorized')
            error.status = STATUS_CODES.UNAUTHORIZED

            throw error
        }

        try {
            let decodedToken = jwt.verify(token, TOKEN_SECRET)

            req.auth = decodedToken

            next()
        } catch (e) {
            let error = new Error('Unauthorized')
            error.status = STATUS_CODES.UNAUTHORIZED

            throw error
        }
    },
    notFoundHandler: (req, res, next) => {
        let err = new Error('Not found')
        err.status = STATUS_CODES.NOT_FOUND

        next(err)
    },
    errorHandler: (err, req, res, next) => {
        console.error(err)
        let errorCode = STATUS_CODES.INTERNAL_SERVER_ERROR

        if (err.status) {
            errorCode = err.status
        } else if (err.meta && err.meta.statusCode) {
            errorCode = err.meta.statusCode
        }

        res.status(errorCode).send(err)
    }
}