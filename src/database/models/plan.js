const mongoose = require('mongoose');

const { DATABASE: { COLLECTION_NAMES: { PLAN, USER } } } = require('../../utils/constants');

const { Schema } = mongoose;

const PlanSchema = new Schema({
    lowValue: {
        type: Number,
        default: 80
    },
    highValue: {
        type: Number,
        default: 160
    },
    slowInsulinType: {
        type: String,
        default: ''
    },
    fastInsulinType: {
        type: String,
        default: ''
    },
    debuteYear: {
        type: String
    },
    knownProblems: {
        type: String,
        default: ''
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER
    },
    isDeleted: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model(PLAN, PlanSchema);