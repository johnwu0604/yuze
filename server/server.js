// app
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors());
var port = process.env.PORT || 5000

// parser
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

// db
var mongoose = require('mongoose')
var promise = require('bluebird')
mongoose.Promise = promise
mongoose.connect('mongodb://localhost/yuze', { useMongoClient: true } )

// env
var env = require('dotenv')
env.config()

// setup
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended': 'true', limit: '500mb', parameterLimit: 1000000}))
app.use(bodyParser.json({ type: 'application/vnd.api+json',limit: '500mb' }))
app.use(methodOverride())

// routes
require('./routes/test')(app)
require('./routes/menuItem')(app)
require('./routes/customer')(app)

// start server
app.listen(port)
console.log('App listing on port ' + port)
