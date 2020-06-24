const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose')

// import schemas
const JournalEntry = require('../models/journalEntry')
const User = require('../models/user')
const Article = require('../models/article')

//import processing functions
const { analyzeIntent } = require('../processing')

let getIntents = async (segments) => {
  var intents = []
  for (let segment of segments) {
    await analyzeIntent(segment).then(([error, intent]) => {
      if (error) {
        return res.status(500).json({ error })
      } else {
        intents.push(intent)
      }
    })
  }
  return intents
}

var intentStrengthes = {
  'anger': 0.0,
  'anxiety': 0.0,
  'depression': 0.0,
  'happy': 0.0,
  'health': 0.0,
  'productivity': 0.0,
  'sleep': 0.0
};


getIntent = (intents) => {
  if (!intents) return 'productivity';
  var maxStrength = 0.0;
  var strongestIntent = 'productivity';
  for (let intent of intents) {
    intentStrengthes[intent.name] =
      intentStrengthes[intent.name] + intent.confidence;
    if (intentStrengthes[intent.name] >= maxStrength) {
      maxStrength = intentStrengthes[intent.name];
      strongestIntent = intent.name;
    }
  };
  return strongestIntent;
}

const createJournalEntry = ({ req, res, text, positivityScore, intents, user, article }) => {
  const journal = new JournalEntry({
    text,
    positivityScore,
    intents,
    article
  })

  console.log(article)

  journal.save((err, updated_journal) => {
    if (err) {
      return res.status(501).json({ error: err })
    } else {
      User.findByIdAndUpdate(user, { $push: { journals: journal } }, (error, user) => {
        if (error) {
          return res.status(501).json({ error })
        } else {
          return res.status(200).json({ journal: updated_journal, article })
        }
      })
    }
  })
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

    getIntents(segments == null ? text : segments).then((intents) => {
      const positivityScore = 1
      const intentName = getIntent(intents);

      Article.find({ tags: { $in: [intentName] } })
        .exec()
        .then((articles, error) => {
          console.log(articles)
          if (error || !articles) {
            // Get a random entry
            var random = Math.floor(Math.random() * 10)

            // Again query all articles but only fetch one offset by our random #
            Article.findOne().skip(random).exec(
              function (err, randomArticle) {
                if (err) {
                  return res.status(500).json({ error: err })
                } else {
                  return createJournalEntry({
                    req,
                    res,
                    text,
                    positivityScore,
                    intents,
                    user,
                    article: randomArticle
                  })
                }
              })
          } else {
            var index = Math.floor(Math.random() * articles.length)
            var article = articles[index]
            return createJournalEntry({
              req,
              res,
              text,
              positivityScore,
              intents,
              user,
              article
            })
          }
        })
    })
  })

router.route('/:id/favorite')
  .put((req, res) => {
    const { id } = req.params
    const { favorited } = req.body

    JournalEntry.findByIdAndUpdate(id, { "$set": { "favorited": favorited != 'true' } }, { new: true }, (error, journal) => {
      if (error) return res.status(500).json({ error })
      else {
        return res.status(200).json({ journal })
      }
    })
  })

module.exports = router