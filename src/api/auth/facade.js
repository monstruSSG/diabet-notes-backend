const jwt = require('jsonwebtoken');
const STATUS_CODES = require('http-status-codes');

const usersLogic = require('../users/logic');
const { TOKEN_SECRET } = require('../../utils/constants');

module.exports = {
    login: async (email, password, deviceId) => {
        let user = await usersLogic.getOne({ email });

        if (!user) {
            let error = new Error('User with email not found')
            error.status = STATUS_CODES.UNAUTHORIZED

            throw error
        };

        if (!await user.comparePassword(password)) {
            let error = new Error('Invalid password')
            error.status = STATUS_CODES.UNAUTHORIZED

            throw error
        };

        let token = jwt.sign({
            _id: user._id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }, TOKEN_SECRET);

        // Update deviceId token
        if (deviceId) {
            await usersLogic.update(user._id, { uniqueDeviceId: deviceId })
        }

        return {
            user,
            token
        }
    },
    createUser: async user => {
        let createdUser = await usersLogic.create(user)

        return { user: createdUser }
    }
}