const router = require('express').Router();
const wrap = require('express-async-wrap');
const STATUS_CODES = require('http-status-codes');

const facade = require('./facade');

router.route('/')
    .get(wrap(async (req, res) => {
        let result = await facade.get(req.auth._id)

        return res.send(result)
    }))
    .patch(wrap(async (req, res) => {
        let result = await facade.update(req.auth._id, req.body.plan);

        return res.status(STATUS_CODES.CREATED).send(result);
    }))

module.exports = router;