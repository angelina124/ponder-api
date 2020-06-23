const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose')

// import schemas
const JournalEntry = require('../models/journalEntry')
const User = require('../models/user')

//import processing functions
const { analyzeIntent } = require('../processing')

let getIntents = async (segments) => {
  var intents = []
  for (let segment of segments) {
    await analyzeIntent(segment).then(([error, intent]) => {
      if (error) {
        return res.status(500).json({ error })
      } else {
        console.log(intent)
        intents.push(intent)
      }
    })
  }
  return intents
}

router.route('/')
  .post((req, res) => {
    let { text, user } = req.body

    if (!text || !user) {
      return res.status(400).json({
        error: "Text or user may be missing in your request."
      })
    }

    // the max length for a wit.ai utterance is 280 characters so we need to
    // break the message up into segments
    segments = text.match(/.{1,280}\./g)
    getIntents(segments).then((intents) => {
      const positivityScore = 1

      const journal = new JournalEntry({
        text,
        positivityScore,
        intents
      })

      journal.save((err, journal) => {
        if (err) {
          return res.status(501).json({ error: err })
        } else {
          User.findByIdAndUpdate(user, { $push: { journals: journal } }, (error, user) => {
            if (error) {
              return res.status(501).json({ error })
            } else {
              return res.status(200).json({ journal })
            }
          })
        }
      })
    })
  })
  .get((req, res) => { })

module.exports = router