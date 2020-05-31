const logic = require('./logic');

module.exports = {
    get: logic.get,
    addPatient: async (nutritionistId, patientId) => {
        await logic.update(nutritionistId, { $push: { managedUsers: patientId } })
        await logic.update(patientId, { nutritionist: nutritionistId })

        return true
    },
    addPhoto: async (nutritionistId, files) => {
        if(!files || !files.length) throw new Error('No file provided')

        const nutritionist = await logic.update(nutritionistId, { nutritionstPhoto: files[0].filename })

        return nutritionist
    }
}