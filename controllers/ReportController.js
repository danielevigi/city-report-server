const Report = require('../models/ReportTypeModel')
const multer = require('multer')
const appConfig = require('../config/app')
const Utils = require('../lib/Utils')


const ReportController = {
	getAll: function(req, res, next) {
		Report.find(function (err, reports) {
			if (err) return next(err)
			res.json(reports)
		})
	},
	add: [
		// use multer to parse multipart body
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
		}).single('image'),
		function(req, res, next) {
			Utils.multerPreserveFileExtension(req.file)
			let newReport = new Report({
				title: req.body.title,
				// TODO: continue
				image: req.file.filename
			})
			newReport.save(function (err) {
				if (err) {
					return res.json({success: false, msg: 'Save report type failed.'})
				}
				res.json({success: true, msg: 'Successful created new report type.'})
			})
		}
	]
}


module.exports = ReportController