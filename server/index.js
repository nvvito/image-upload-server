const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = require('./router')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/image', express.static('upload'))

app.use(router)

mongoose
    .connect('mongodb://mongo:27017/files', { useNewUrlParser: true })
    .then(() => console.log('Connected successfully to db server!'))
    .catch(err => console.log(err))

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'))
