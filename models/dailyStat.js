const mongoose = require('mongoose')
const { Schema, model } = mongoose

var DailyStatSchema = new Schema({
  positivityScore: {
    type: Number,
    required: true
  },
  journalEntries: [{
    ref: 'Journal',
    type: Schema.ObjectId,
    required: true
  }]
})