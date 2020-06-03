const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose')

router.route('/')
  // create a user
  .post((req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      res.status(400).json({
        error: true,
        err: "Invalid fields you dummy! Please give me a username and a password!"
      })
    }

    const hashed_pw = bcrypt.hashSync(password, 10)

    var user = new User({
      username,
      password: hashed_pw
    })

    user.save((err, userDoc) => {
      if (err) {
        res.status(500).json({
          error: true,
          err: "Oops! My bad! Looks like something went wrong with the db :("
        })
      } else {
        res.status(200).json({ user: userDoc })
      }
    })
  })

module.exports = router