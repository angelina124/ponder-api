const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose')

router.route('/')
  .get((req, res) => {

  })

export default router