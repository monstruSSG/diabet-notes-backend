const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');

const { DATABASE: { COLLECTION_NAMES: { USER }, USER_TYPES } } = require('../../utils/constants');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        validate: [isEmail, 'Invalid Email']
    },
    type: {
        type: String,
        enum: Object.values(USER_TYPES),
        default: USER_TYPES.USER
    },
    phoneNumber: {
        type: String,
        unique: true,
        validate: [isMobilePhone, 'Invalid Phone Number']
    },
    identityCardNumber: {
        type: String,
        unique: true
    },
    uniqueDeviceId: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model(USER, UserSchema);