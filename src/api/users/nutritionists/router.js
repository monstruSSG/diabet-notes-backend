const router = require('express').Router({ mergeParams: true });
const wrap = require('express-async-wrap');
const STATUS_CODES = require('http-status-codes');

const facade = require('./facade');
const multer = require('../../../services/multer')

router.route('/')
    .get(wrap(async (req, res) => {
        let result = await facade.get()

        return res.send(result)
    }))

router.route('/appointment')
    .patch(wrap(async (req, res) => {
        await facade.createAppointment(req.auth._id)

        return res.send({ message: 'Appointment created' })
    }))

router.route('/appointment/:APPOINTMENT_ID')
    .patch(wrap(async (req, res) => {
        await facade.confirmAppointment(req.auth._id, req.params.APPOINTMENT_ID, req.body)

        return res.send({ message: 'Appontment confirmed' })
    }))

router.route('/:NUTRITIONIST_ID/addPatient')
    .patch(wrap(async (req, res) => {
        await facade.addPatient(req.params.NUTRITIONIST_ID, req.auth._id)

        return res.send({ message: 'Done' })
    }))

router.route('/:NUTRITIONIST_ID/photo')
    .patch(multer.any(), wrap(async (req, res) => {
        await facade.addPhoto(req.params.NUTRITIONIST_ID, req.files)

        return res.send({ message: 'Done' })
    }))

module.exports = router;