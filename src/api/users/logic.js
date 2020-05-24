let database = require('./database');

const { DATABASE: { USER_TYPES } } = require('../../utils/constants')

module.exports = {
    get: async options => {
        let [users, count] = await Promise.all([
            database.get({ ...options, type: USER_TYPES.USER }),
            database.count({ ...options, type: USER_TYPES.USER })
        ]);

        return {
            users,
            count
        }
    },
    create: database.create,
    update: database.update,
    delete: database.delete,
    getById: database.getById,
    getOne: database.findOne
}