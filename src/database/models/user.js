const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');
const bcrypt = require('bcrypt');

const { DATABASE: { COLLECTION_NAMES: { USER }, USER_TYPES }, SALT_GEN_FACTOR } = require('../../utils/constants');

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
    country: {
        type: String
    },
    city: {
        type: String
    },
    region: {
        type: String
    },
    street: {
        type: String
    },
    streetNumber: {
        type: String
    },
    clinicName: {
        type: String
    },
    clinicImagePath: {
        type: String
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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_GEN_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = async function (data) {
    return await bcrypt.compare(data, this.password);
};

module.exports = mongoose.model(USER, UserSchema);