const STATUS_CODES = require('http-status-codes')

module.exports = {
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