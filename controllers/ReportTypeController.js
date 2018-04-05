const ReportType = require('../models/ReportTypeModel')
const multer = require('multer')
const appConfig = require('../config/app')
const Utils = require('../lib/Utils')
const { check, validationResult } = require('express-validator/check')


const ReportTypeController = {}


ReportTypeController.validation = [
	check('name', 'invalid name')
		.trim()
		.isLength({ min: 1 }),
	function (req, res, next) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(422).json({ success: false, msg: errors.mapped() })
		}
		next()
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
	function(req, res, next) {
		if (req.file) {
			Utils.multerPreserveFileExtension(req.file)
		} else {
			res.json(Utils.validationErrorMessage('image', 'image is mandatory'))
		}
		next()
	}
]


ReportTypeController.getAll = (req, res, next) => {
	ReportType.find(function (err, reportTypes) {
		if (err) return next(err)
		res.json(reportTypes)
	})
}


ReportTypeController.add = [
	ReportTypeController.handleUpload,
	ReportTypeController.validation,
	function (req, res, next) {
		let newReportType = new ReportType({
			name: req.body.name,
			image: req.file.filename
		})
		newReportType.save(function (err) {
			if (err) {
				if (err.code === 11000) {
					return res.json({success: false, msg: 'Report type name already exists'})
				}
				return res.json({success: false, msg: 'Save report type failed'})
			}
			res.json({success: true, msg: 'Successful created new report type'})
		})
	}
]


module.exports = ReportTypeController