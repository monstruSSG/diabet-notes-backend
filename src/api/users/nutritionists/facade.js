let STATUS_CODES = require('http-status-codes')

const logic = require('./logic');
const usersLogic = require('../logic')

module.exports = {
    get: logic.get,
    addPatient: async (nutritionistId, patientId) => {
        await logic.update(nutritionistId, { $push: { managedUsers: patientId } })
        await logic.update(patientId, { nutritionist: nutritionistId })

        return true
    },
    addPhoto: async (nutritionistId, files) => {
        if (!files || !files.length) throw new Error('No file provided')

        const nutritionist = await logic.update(nutritionistId, { nutritionstPhoto: files[0].filename })

        return nutritionist
    },
    createAppointment: async userId => {
        let user = await usersLogic.getById(userId)

        if (!user) {
            let error = new Error('No user found')
            error.status = STATUS_CODES.NOT_FOUND

            throw error
        }

        let nutritionist = await usersLogic.getById(user.nutritionist._id)

        if (!nutritionist) {
            let error = new Error('No nutritionist found')
            error.status = STATUS_CODES.NOT_FOUND

            throw error
        }

        let appointments = nutritionist.appointments
        console.log(JSON.stringify(appointments))
        if (appointments) {
            appointments.push({
                patient: userId,
                accepted: false
            })
        }

        await usersLogic.update(nutritionist._id, { appointments: appointments })

        return { message: 'Appointment created' }
    },
    confirmAppointment: async (nutritionistId, userId) => {
        let nutritionist = await usersLogic.getById(nutritionistId)

        if (!nutritionist) {
            let error = new Error('Not found')
            error.status = STATUS_CODES.NOT_FOUND

            throw error
        }

        let appointments = nutritionist.appointments

        if (appointments) {
            let appointmentIndex = appointments.findIndex(appointment => appointment.patient === userId)

            if (appointmentIndex < 0) throw new Error('No appointment found')

            appointments[appointmentIndex].accepted = true
        }

        await usersLogic.update(nutritionistId, { appointments: appointments })

        return { message: 'Appointment accepted' }
    }
}