var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title: String,
    summary: String,
    thumbnail: String,
    description: String
});

module.exports = mongoose.model('articles', ArticleSchema);