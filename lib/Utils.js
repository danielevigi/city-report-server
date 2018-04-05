const fs = require('fs')


const Utils = {
	multerPreserveFileExtension: function(file) {
		let newFileExtension = ''
		if (file.mimetype === 'image/jpeg') {
			newFileExtension = '.jpg'
		} else if (file.mimetype === 'image/png') {
			newFileExtension = '.png'
		} else if (file.mimetype === 'image/gif') {
			newFileExtension = '.gif'
		}
		let newPath = file.path + newFileExtension
		fs.rename(file.path, newPath, function(err) {
			if (err) console.log('ERROR: ' + err)
		})
		file.path += newFileExtension
		file.filename += newFileExtension
	},


	/**
	 * Return an error json object
	 * @param {String|Object} message The error message
	 */
	errorMessage(message) {
		return {
			success: false,
			msg: message
		}
	},


	/**
	 * Return a validation error json object
	 * @param {String} fieldName The name of the field
	 * @param {String} message The error message
	 */
	validationErrorMessage(fieldName, message) {
		return {
			success: false,
			msg: {
				name: {
					location: 'body',
					param: fieldName,
					msg: message
				}
			}
		}
	}


}


module.exports = Utils