const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose')

// import article schema
const Article = require('../models/article')


router.route('/')
  .post((req, res) => {
    let { title, url, tags } = req.body

    if (!title || !url || !tags) {
      return res.status(400).json({
        error: "Title, url, or tags may be missing in your request."
      })
    }

    var article = new Article({
      title,
      url,
      tags
    })

    article.save((err, article) => {
      if (err) {
        return res.status(501).json({ error: err })
      } else {
        return res.status(200).json({ article: article })
      }
    })
  })
  .get((req, res) => {
    let { user, intents, entities } = req.body

    // do some wit.ai processing
    // maybe fun articles?
    // quotes?
    // book passages?
    // general self care??
    // entities for fun stuff like cooking
    // I'm so bored

    if (!user || !limit) {
      return res.status(400).json({
        error: "User or limit may be missing in your request."
      })
    } else {
      //Article.find
    }
  })

module.exports = router