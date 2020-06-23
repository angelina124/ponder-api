const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Define user schema
var UserSchema = new Schema({
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
  journals: [{
    type: Schema.ObjectId,
    ref: 'JournalEntry',
    required: false
  }],
  favoriteJournals: [{
    type: Schema.ObjectId,
    ref: 'JournalEntry',
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