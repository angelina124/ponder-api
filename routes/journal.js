const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose')

// import journal schema
const JournalEntry = require('../models/journalEntry')

//import processing functions
const analyzeIntent = require('../models/processing')

router.route('/')
  .post((req, res) => {
    let { text } = req.body

    if (!text) {
      return res.status(400).json({
        error: "Text may be missing in your request."
      })
    }

    const intents = analyzeIntent(text)
    const positivityScore = 1

    const journal = new JournalEntry({
      title,
      positivityScore,
      intents
    })

    article.save((err, article) => {
      if (err) {
        return res.status(501).json({ error: err })
      } else {
        return res.status(200).json({ article: article })
      }
    })
  })
  .get((req, res) => { })

module.exports = router