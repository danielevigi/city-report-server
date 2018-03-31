const router = require('express').Router()

router.get('/', function(req, res, next) {
	res.send('City Report REST Web Service')
})

router.use('/api', require('./api'))

module.exports = router