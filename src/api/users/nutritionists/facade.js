const logic = require('./logic');

module.exports = {
    get: logic.get,
    addPatient: async (nutritionistId, patientId) => {
        await logic.update(nutritionistId, { $push: { managedUsers: patientId } })
        await logic.update(patientId, { nutritionist: nutritionistId })

        return true
    }
}