const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define user schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  tags: [{
    type: String,
    required: true
  }]
});

// Export Mongoose model
module.exports = model('Article', ArticleSchema);