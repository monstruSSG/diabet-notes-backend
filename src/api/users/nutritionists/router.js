const router = require('express').Router({ mergeParams: true });
const wrap = require('express-async-wrap');
const STATUS_CODES = require('http-status-codes');

const facade = require('./facade');

router.route('/')
    .get(wrap(async (req, res) => {
        let result = await facade.get()

        return res.send(result)
    }))

module.exports = router;