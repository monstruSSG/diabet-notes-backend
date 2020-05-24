const { Comment } = require('../../database/models');

module.exports = {
    get: async options => {
        let comments = await Comment.find({ ...options });

        return comments;
    },
    count: async options => {
        let count = await Comment.countDocuments({ ...options });

        return count;
    },
    create: async comment => {
        let newComment = await Comment.create(comment);

        return newComment;
    },
    getById: async id => {
        let comment = await Comment.findById(id);

        return comment;
    },
    update: async (id, comment) => {
        let updateComment = await Comment.findByIdAndUpdate(id, comment);

        return updateComment;
    },
    delete: async id => {
        let deletedComment = await Comment.findByIdAndUpdate(id, { isDeleted: true });

        return deletedComment;
    },
    findOne: async options => {
        let comment = await Comment.findOne(options);

        return comment;
    }
}