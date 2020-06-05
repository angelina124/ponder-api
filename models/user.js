const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define user schema
var UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  stats: [{
    type: Schema.ObjectId,
    ref: 'DailyStat',
    required: false
  }],
  articles: [{
    type: Schema.ObjectId,
    ref: 'Article',
    required: false
  }],
  collections: [{
    type: Schema.ObjectId,
    ref: 'Collection',
    required: false
  }],
  loginStreak: {
    type: Number,
    required: false
  },
  //mentalHealthScore?
});

// Export Mongoose model
module.exports = model('User', UserSchema);