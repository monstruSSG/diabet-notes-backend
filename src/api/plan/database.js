const { Plan } = require('../../database/models')

module.exports = {
    findOne: personId => Plan.findOne({ person: personId }),
    update: (personId, newPlan) => Plan.findOneAndUpdate({ person: personId }, newPlan),
    create: plan => Plan.create(plan)
}