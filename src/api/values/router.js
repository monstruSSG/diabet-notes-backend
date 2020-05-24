const router = require('express').Router();
const wrap = require('express-async-wrap');
const STATUS_CODES = require('http-status-codes');

const facade = require('./facade');

router.route('/')
    .get(wrap(async (req, res) => {
        let result = await facade.get()

        return res.send(result)
    }))
    .post(wrap(async (req, res) => {
        let result = await facade.create(req.body.value);

        return res.status(STATUS_CODES.CREATED).send(result);
    }))

router.route('/:ID')
    .get(wrap(async (req, res) => {
        let result = await facade.getById(req.params.ID)

        return res.send(result)
    }))
    .delete(wrap(async (req, res) => {
        let result = await facade.delete(req.params.ID)

        return res.send(result)
    }))

module.exports = router;