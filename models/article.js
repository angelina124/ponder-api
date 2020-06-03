const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define user schema
var ArticleSchema = new Schema({});

// Export Mongoose model
module.exports = model('Article', ArticleSchema);