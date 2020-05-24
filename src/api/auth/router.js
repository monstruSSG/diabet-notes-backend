const router = require('express').Router();
const wrap = require('express-async-wrap');
const STATUS_CODES = require('http-status-codes');

const facade = require('./facade');

router.route('/login')
    .patch(wrap(async (req, res) => {
        let result = await facade.login(req.body.user.email, req.body.user.password);

        return res.status(STATUS_CODES.CREATED).send(result);
    }))

module.exports = router;