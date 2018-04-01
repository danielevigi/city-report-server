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
	}
}


module.exports = Utils