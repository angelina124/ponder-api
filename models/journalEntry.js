const mongoose = require('mongoose')
const { Schema, model } = mongoose

var JournalEntrySchema = new Schema({
  positivityScore: {
    type: Number,
    required: true
  },
  intents: [{
    type: String
  }],
  text: {
    type: String,
    required: true
  }
})

module.exports = model('JournalEntry', JournalEntrySchema);