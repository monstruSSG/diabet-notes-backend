let database = require('./database');

module.exports = {
    get: async options => {
        let [values, count] = await Promise.all([database.get(options), database.count(options)]);

        return {
            values,
            count
        }
    },
    create: database.create,
    update: database.update,
    delete: database.delete,
    getById: database.getById,
    getOne: database.findOne
}