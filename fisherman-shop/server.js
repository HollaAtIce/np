require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const port = process.env.PORT || 8081

const routes = require('./app/routes')
app.use(require('./static'))

mongoose.promise = Promise


app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(routes)
mongoose.connect(process.env.MONGO_DB_URL)

app.listen(port, () => console.log(`listening on ${port}`))
