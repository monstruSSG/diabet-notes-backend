const { User } = require('../../database/models');

module.exports = {
    get: async options => {
        let users = await User.find({ ...options });

        return users;
    },
    count: async options => {
        let count = await User.countDocuments({ ...options });

        return count;
    },
    create: async user => {
        let newUser = await User.create(user);

        return newUser;
    },
    getById: async id => {
        let user = await User.findById(id);

        return user;
    },
    update: async (id, user) => {
        let updatedUser = await User.findByIdAndUpdate(id, user);

        return updatedUser;
    },
    delete: async id => {
        let deletedUser = await User.findByIdAndUpdate(id, { isDeleted: true });

        return deletedUser;
    },
    findOne: async options => {
        let user = await User.findOne(options);

        return user;
    }
}