const logic = require('./logic');

module.exports = {
    get: logic.get,
    create: logic.create,
    update: logic.update,
    delete: logic.delete,
    getById: logic.getById,
    addAnalysis: async (userId, files) => {
        if (!files || !files.length) throw new Error('No file provided')

        const user = await logic.update(userId, { $push: { analysis: files[0].filename } })

        return user
    }
}
