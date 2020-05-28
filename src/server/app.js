const express = require('express')
const app = express()
const router = require('./routes/routes')
const bodyParser = require('body-parser')

const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(router)

app.options('*', cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

module.exports = app