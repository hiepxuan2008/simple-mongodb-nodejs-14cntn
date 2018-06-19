var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    articleID: {
        type: String,
        required: true
    }
});

var Comment = mongoose.model('comments', CommentSchema);
module.exports = Comment;