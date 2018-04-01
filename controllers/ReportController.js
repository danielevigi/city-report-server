const Report = require('../models/ReportTypeModel')


const ReportController = {
	getAll: function(req, res, next) {
		Report.find(function (err, reports) {
			if (err) return next(err)
			res.json(reports)
		})
	},
	add: function(req, res, next) {
		// test
	}
}


module.exports = ReportController