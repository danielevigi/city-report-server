const passport = require('passport')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const config = require('../config/app')
const JwtStrategy = require('passport-jwt').Strategy
const	ExtractJwt = require('passport-jwt').ExtractJwt

let opts = {
	secretOrKey: config.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
}
passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
	User.findOne({
		id: jwtPayload.id
	}, function (err, user) {
		if (err) {
			return done(err, false)
		}
		if (user) {
			done(null, user)
		} else {
			done(null, false)
		}
	})
}))


module.exports = {
	getToken: function (headers) {
		if (headers && headers.authorization) {
			var parted = headers.authorization.split(' ')
			if (parted.length === 2) {
				return parted[1]
			} else {
				return null
			}
		} else {
			return null
		}
	},
	required: function(req, res, next) {
		passport.authenticate('jwt', { session: false })
		let token = this.getToken(req.headers)
		if (token) {
			next()
		} else {
			return res.status(403).send({success: false, msg: 'Unauthorized.'})
		}
	},
	signup: function (req, res) {
		if (!req.body.username || !req.body.password) {
			res.json({success: false, msg: 'Please pass username and password.'})
		} else {
			var newUser = new User({
				username: req.body.username,
				password: req.body.password
			})
			// save the user
			newUser.save(function (err) {
				if (err) {
					return res.json({success: false, msg: 'Username already exists.'})
				}
				res.json({success: true, msg: 'Successful created new user.'})
			})
		}
	},
	signin: function (req, res) {
		User.findOne({
			username: req.body.username
		}, function (err, user) {
			if (err) throw err
			if (!user) {
				res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
			} else {
				// check if password matches
				user.comparePassword(req.body.password, function (err, isMatch) {
					if (isMatch && !err) {
						// if user is found and password is right create a token
						var token = jwt.sign(user.toJSON(), config.secret)
						// return the information including token as JSON
						res.json({success: true, token: 'JWT ' + token})
					} else {
						res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
					}
				})
			}
		})
	}
}