const ReportType = require('../models/ReportTypeModel')

module.exports = {
	getAll: function(req, res, next) {
		ReportType.find(function (err, reportTypes) {
			if (err) return next(err)
			res.json(reportTypes)
		})
	},
	add: function(req, res, next) {
		let newReportType = new ReportType({
			name: req.body.name,
			image: req.body.image
		})
		newReportType.save(function (err) {
			if (err) {
				return res.json({success: false, msg: 'Save report type failed.'})
			}
			res.json({success: true, msg: 'Successful created new report type.'})
		})
	}
}