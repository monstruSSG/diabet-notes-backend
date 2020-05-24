const { Value } = require('../../database/models');

module.exports = {
    get: async options => {
        let values = await Value.find({ ...options });

        return values;
    },
    count: async options => {
        let count = await Value.countDocuments({ ...options });

        return count;
    },
    create: async value => {
        let newValue = await Value.create(value);

        return newValue;
    },
    getById: async id => {
        let value = await Value.findById(id);

        return value;
    },
    update: async (id, value) => {
        let updateValue = await Value.findByIdAndUpdate(id, value);

        return updateValue;
    },
    delete: async id => {
        let deletedValue = await Value.findByIdAndUpdate(id, { isDeleted: true });

        return deletedValue;
    },
    findOne: async options => {
        let value = await Value.findOne(options);

        return value;
    }
}