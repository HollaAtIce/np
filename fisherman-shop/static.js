const express = require('express')
const app = express()
const path = require('path')

module.exports = app

app.use('/static', express.static(path.join(__dirname, 'public/static')))

