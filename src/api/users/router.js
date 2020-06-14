const router = require('express').Router();
const wrap = require('express-async-wrap');
const STATUS_CODES = require('http-status-codes');

const facade = require('./facade');
const multer = require('../../services/multer')

router.use('/nutritionists', require('./nutritionists/router'))

router.route('/')
    .get(wrap(async (req, res) => {
        let result = await facade.get()

        return res.send(result)
    }))
    
router.route('/addAnalysis')
    .patch(multer.any(), wrap(async (req, res) => {
        await facade.addAnalysis(req.auth._id, req.files)

        return res.send({ message: 'Done' })
    }))

router.route('/me')
    .get(wrap(async (req, res) => {
        let result = await facade.getById(req.auth._id)

        return res.send(result)
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