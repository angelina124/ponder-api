const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose')

// bcrypt for password hashing
const bcrypt = require('bcrypt')

// imprt user schema
const User = require('../models/user')

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

module.exports = router