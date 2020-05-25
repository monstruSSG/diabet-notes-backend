const mongoose = require('mongoose');
const { isNumeric } = require('validator');

const { DATABASE: { COLLECTION_NAMES: { VALUE, USER } } } = require('../../utils/constants');

const { Schema } = mongoose;

const ValueSchema = new Schema({
    value: {
        type: String,
        validate: [isNumeric, 'Value must be Numeric']
    },
    comment: {
        type: String
    },
    fastInsulin: {
        type: String,
        validate: [isNumeric, 'Value must be Numeric'],
        default: '0'
    },
    slowInsulin: {
        type: String,
        validate: [isNumeric, 'Value must be Numeric'],
        default: '0'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER
    },
    isDeleted: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model(VALUE, ValueSchema);