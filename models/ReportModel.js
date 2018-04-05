const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ReportSchema = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	reportType: {
		type: Schema.Types.ObjectId,
		ref: 'ReportType'
	},
	photo: {
		type: String
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	date: {
		type: Date,
		default: Date.now
	},
	latitude: {
		type: Number
	},
	longitude: {
		type: Number
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'confirmed', 'completed']
		}],
		default: 'pending'
	}
})


module.exports = mongoose.model('Report', ReportSchema)