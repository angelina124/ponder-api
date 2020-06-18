const mongoose = require('mongoose')
const { Schema, model } = mongoose

var JournalEntrySchema = new Schema(
  {
    positivityScore: {
      type: Number,
      required: true
    },
    intent: {
      name: {
        type: String
      },
      confidence: {
        type: Number
      }
    },
    text: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = model('JournalEntry', JournalEntrySchema);