const jwt = require('jsonwebtoken');
const STATUS_CODES = require('http-status-codes');

const usersLogic = require('../users/logic');
const { TOKEN_SECRET } = require('../../utils/constants');

module.exports = {
    login: async (email, password) => {
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

        let token = jwt.sign({ ...user }, TOKEN_SECRET);

        return {
            user,
            token
        }
    }
}