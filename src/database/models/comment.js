const mongoose = require('mongoose');

const { DATABASE: { COLLECTION_NAMES: { COMMENT, USER } } } = require('../../utils/constants');

const { Schema } = mongoose;

const CommentSchema = new Schema({
    comment: {
        type: String,
        default: ''
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER
    },
    responses: [
        {
            comment: { type: String },
            postdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: USER
            }
        }
    ],
    isDeleted: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model(COMMENT, CommentSchema);