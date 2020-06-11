const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
require('dotenv').config()

// set up cors to allow cross-origin requests
const cors = require('cors')
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://angelina124:J4nC6a8qBKJbX1CY@cluster0-9mh5x.mongodb.net/test?retryWrites=true&w=majority');

// Initialize http server
const app = express()

// to allow parsing of request bodies
// set up bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/users/', require('./routes/user'))
app.use('/api/articles/', require('./routes/article'))
app.use('/api/journals/', require('./routes/journal'))

const port = process.env.PORT || 3000;
// creates express server
app.listen(port, () => {
  console.log('listening on 3000')
})
