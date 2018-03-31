const Report = require('../models/ReportTypeModel')

module.exports = {
	getAll: function(req, res, next) {
		Report.find(function (err, reports) {
			if (err) return next(err)
			res.json(reports)
		})
	},
	add: function(req, res, next) {
		let newReportType = new Report({
			// TODO: add report properties
		})
		newReportType.save(function (err) {
			if (err) {
				return res.json({success: false, msg: 'Save report type failed.'})
			}
			res.json({success: true, msg: 'Successful created new report type.'})
		})
	}
}