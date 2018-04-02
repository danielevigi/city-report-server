const ReportType = require('../models/ReportTypeModel')
const multer = require('multer')
const appConfig = require('../config/app')
const Utils = require('../lib/Utils')
const { check, validationResult } = require('express-validator/check')


const ReportTypeController = {}


ReportTypeController.validation = [
	// name validation
	check('name')
		.exists()
		.withMessage('name is mandatory')
		.trim()
		.custom(value => {
			ReportType.findOne({ name: value }, function(err, reportType) {
				if (!err && reportType) {
					throw new Error('Name already exists')
				}
			})
		}),
	// image validation
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.mapped() })
		}
	}
]


ReportTypeController.handleUpload = [
	multer({
		// upload destination path
		dest: appConfig.imageUploadFolder + '/reportTypes/',
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
	}).single('image'),
	(req, res, next) => {
		Utils.multerPreserveFileExtension(req.file)
	}
]


ReportTypeController.getAll = (req, res, next) => {
	ReportType.find(function (err, reportTypes) {
		if (err) return next(err)
		res.json(reportTypes)
	})
}


ReportTypeController.add = [
	ReportTypeController.validation,
	ReportTypeController.handleUpload,
	(req, res, next) => {
		let newReportType = new ReportType({
			name: req.body.name,
			image: req.file.filename
		})
		newReportType.save(function (err) {
			if (err) {
				return res.json({success: false, msg: 'Save report type failed.'})
			}
			res.json({success: true, msg: 'Successful created new report type.'})
		})
	}
]


module.exports = ReportTypeController