let database = require('./database');

const { DATABASE: { USER_TYPES } } = require('../../../utils/constants')

module.exports = {
    get: async options => {
        let [users, count] = await Promise.all([
            database.get({ ...options, type: USER_TYPES.DOCTOR }),
            database.count({ ...options, type: USER_TYPES.DOCTOR })
        ]);

        return {
            users,
            count
        }
    },
}