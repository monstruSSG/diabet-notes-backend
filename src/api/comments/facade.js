const logic = require('./logic');

module.exports = { 
    get: logic.get,
    create: logic.create,
    update: logic.update,
    delete: logic.delete,
    getById: logic.getById
}