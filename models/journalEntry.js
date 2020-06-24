const mongoose = require('mongoose')
const { Schema, model } = mongoose

var JournalEntrySchema = new Schema(
  {
    positivityScore: {
      type: Number,
      required: true
    },
    intents: [{
      name: {
        type: String
      },
      confidence: {
        type: Number
      }
    }],
    text: {
      type: String,
      required: true
    },
    article: {
      type: Schema.ObjectId
    },
    favorited: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = model('JournalEntry', JournalEntrySchema);