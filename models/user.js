const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define user schema
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
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
  friends: [{
    type: Schema.ObjectId,
    ref: 'User',
    required: false
  }],
  loginStreak: {
    type: Number,
    required: false
  }
});

// Export Mongoose model
module.exports = model('User', UserSchema);