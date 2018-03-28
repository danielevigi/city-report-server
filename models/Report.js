const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const ReportType = require('./ReportType');

const UserSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  reportType: {
    type: ReportType
  },
  photo: {
    type: String
  },
  user: {
    type: User
  },
  date: {
    type: Date,
    default: Date.now
  },
  latitude: {
    type: Double
  },
  longitude: {
    type: Double
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'confirmed', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('User', UserSchema);