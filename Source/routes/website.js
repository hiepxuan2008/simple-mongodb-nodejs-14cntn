var express = require('express');
var app = express.Router();
var Article = require('../models/article');

// homepage
app.get('/', function(req, res) {
    Article.find({}, function(err, articles) {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }
        res.render('index', {articles: articles});
    });
});

// view article detail
app.get("/articles/:id", function(req, res) {
    var id = req.params.id;

    Article.findById(id, function(err, article) {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }
        res.render("article", {article: article});
    });
});

module.exports = app;