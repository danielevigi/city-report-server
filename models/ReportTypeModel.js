const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ReportTypeSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	image: {
		type: String
	}
})


module.exports = mongoose.model('ReportType', ReportTypeSchema)