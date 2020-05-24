let database = require('./database');

module.exports = {
    get: async options => {
        let [users, count] = await Promise.all([database.get(options), database.count(options)]);

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