const Report = require('../models/ReportModel')
const multer = require('multer')
const appConfig = require('../config/app')
const Utils = require('../lib/Utils')
const { check, validationResult } = require('express-validator/check')


const ReportController = {}


ReportController.validation = [
	check('title', 'invalid title')
		.trim()
		.isLength({ min: 1 }),
	check('description', 'invalid description')
		.trim()
		.isLength({ min: 1 }),
	check('reportType', 'invalid report type')
		.trim()
		.isLength({ min: 1 }),
	check('latitude', 'invalid latitude')
		.isDecimal(),
	check('longitude', 'invalid longitude')
		.isDecimal(),
	function (req, res, next) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(422).json({ success: false, msg: errors.mapped() })
		}
		next()
	}
]



ReportController.handleUpload = [
	multer({
		// upload destination path
		dest: appConfig.imageUploadFolder + '/reports/',
		// filter file by mimetype
		fileFilter: function (req, file, cb) {
			let acceptedMimeTypes = [
				'image/png',
				'image/gif',
				'image/jpeg'
			]
			if (acceptedMimeTypes.indexOf(file.mimetype) > -1) {
				cb(null, true)
			} else {
				cb(new Error('File type not accepted'))
			}
		}
	}).single('photo'),
	function(req, res, next) {
		console.log('test')
		if (req.file) {
			Utils.multerPreserveFileExtension(req.file)
		} else {
			res.json(Utils.validationErrorMessage('photo', 'photo is mandatory'))
		}
		next()
	}
]



ReportController.getAll = function(req, res, next) {
	Report.find(function (err, reports) {
		if (err) return next(err)
		res.json(reports)
	})
}



ReportController.add = [
	ReportController.handleUpload,
	ReportController.validation,
	function(req, res, next) {
		let newReport = new Report({
			title: req.body.title,
			description: req.body.description,
			reportType: req.body.reportType,
			photo: req.file.filename,
			author: req.body.author,
			date: req.body.date,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			status: req.body.status
		})
		newReport.save(function (err) {
			if (err) {
				console.log('Error Report Save: ', err.errors.reportType.name)
				if (err.errors.reportType.name && err.errors.reportType.name === 'CastError') {
					return res.json({success: false, msg: 'Invalid report type.'})
				}
				return res.json({success: false, msg: 'Save report type failed.'})
			}
			res.json({success: true, msg: 'Successful created new report.'})
		})
	}
]



module.exports = ReportController