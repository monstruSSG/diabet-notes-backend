const database = require('./database')

module.exports = {
    get: database.findOne,
    update: async (personId, newPlan) => {
        let plan = await database.findOne(personId)

        if (!plan) {
            return await database.create({ ...newPlan, person:personId })
        }

        return await database.update(personId, newPlan)
    }
}