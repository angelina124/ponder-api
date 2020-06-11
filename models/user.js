const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define user schema
var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: false
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
  articles: [{
    type: Schema.ObjectId,
    ref: 'Article',
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