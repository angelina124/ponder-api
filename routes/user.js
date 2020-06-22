const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose')

// bcrypt for password hashing
const bcrypt = require('bcrypt')

// import user schema
const User = require('../models/user')

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
          error_msg: err,
          err: "Oops! My bad! Looks like something went wrong with the db :("
        })
      } else {
        res.status(201).json({ user: userDoc })
      }
    })
  })

router.route('/login')
  .post((req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: "Invalid fields" })
    }

    User.findOne({ username }).populate('articles').exec((err, user) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong with the database! Sorry!" })
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return res.status(200).json({ success: true, user })
        } else {
          return res.status(400).json({ error: "Invalid username or password." })
        }
      })
    })
  })
router.route('/:id')
  .get((req, res) => {
    const { id } = req.params
    if (!id) res.status(400).json({ error: true, err: "Ya better gimme an id" })

    User.findById(id).exec((err, user) => {
      if (err || !user) {
        res.status(500).json({ error: true })
      } else {
        res.status(200).json({
          _id: user._id,
          username: user.username
        })
      }
    })
  })
  .delete((req, res) => {
    const { id } = req.params
    if (!id) res.status(400).json({ error: true, err: "Ya better gimme an id" })

    User.findByIdAndDelete(id, (err, user) => {
      // TODO: delete child documents of user once we decie what they should be
      if (err) {
        res.status(500).json({ error: true, err })
      } else {
        res.status(200).json({
          _id: user._id,
          username: user.username
        })
      }
    })
  })

router.route('/:id/passwords')
  .post((req, res) => {
    const { id } = req.params
    const { password } = req.body
    if (!password || !id) {
      res.status(400).json({
        error: true,
        err: "Invalid fields you dummy! Please give me an id and a password!"
      })
    }

    const hashed_pw = bcrypt.hashSync(password, 10)

    User.findByIdAndUpdate(id, { password: hashed_pw }, (err, userDoc) => {
      if (err) {
        res.status(500).json({
          error: true,
          error_msg: err,
          err: "Oops! My bad! Looks like something went wrong with the db :("
        })
      } else {
        res.status(200).json({ user: userDoc })
      }
    })
  })

module.exports = router