const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const appConfig = require('./config/app')
const fs = require('fs')
const rfs = require('rotating-file-stream')
const util = require('util')
const app = express()


// mongodb connection
mongoose.connect(appConfig.database)


// handle cors
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})


// add util middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())


// access log config
if (appConfig.activateAccessLog) {
	const logDirectory = path.join(__dirname, 'log')
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
	const accessLogStream = rfs('access.log', {
		interval: '1d', // rotate daily
		path: logDirectory
	})
	app.use(morgan('dev', {stream: accessLogStream}))
} else {
	app.use(morgan('dev'))
}


// error log config
if (appConfig.activateErrorLog) {
	const logFile = fs.createWriteStream(path.join(__dirname, '/log/error.log'), {flags: 'w'})
	const logStdout = process.stdout
	console.log = function() {
		for (var i = 0; i < arguments.length; i++) {
			logFile.write(util.format(arguments[i]) + ' ')
			logStdout.write(util.format(arguments[i]) + ' ')
		}
		logFile.write('\n')
		logStdout.write('\n')
	}
}


// load routes
app.use('/', require('./routes/index'))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})


// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.send({
		message: err.message,
		error: err
	})
})


module.exports = app