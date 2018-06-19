var express = require('express');
var app = express.Router();
var Article = require('../models/article');
var Comment = require('../models/comment');
var timeAgo = require('node-time-ago');
const COMMENT_LIMIT_DEFAULT = 2;

// get comments by articleID
app.get("/comments", function(req, res) {
    var offset = req.query.offset ? parseInt(req.query.offset) : 0;
    var limit = req.query.limit ? parseInt(req.query.limit) : COMMENT_LIMIT_DEFAULT;
    var articleID = req.query.articleID;

    Comment.find({articleID: articleID}).limit(limit).skip(offset).sort({createdAt: 'desc'}).exec(function(err, comments) {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
        Comment.count({articleID: articleID}, function(err, count) {
            if (err) {
                console.error(err);
                res.status(500).send(err.message);
            }

            comments.forEach(function(comment) {
                comment.createdAtTimeAgo = timeAgo(comment.createdAt);
            });

            res.render('parts/comments', {articleID: articleID, comments: comments, limit: limit, offset: offset, total: count});
        });
    });
});

// post comment
app.post("/comments", function (req, res) {
    Comment.create(req.body, function(err, comment) {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
        res.send(comment);
    });
});

// delete comment
app.delete("/comments/:id", function(req, res) {
    var id = req.params.id;

    Comment.findByIdAndRemove(id, function(err, comment) {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
        res.send(comment);
    });
});

module.exports = app;