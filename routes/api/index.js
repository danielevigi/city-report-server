const router = require('express').Router()
const AuthController = require('../../controllers/AuthController')


router.post('/signin', AuthController.signin)
router.post('/signup', AuthController.signup)
router.use('/users', require('./users'))
router.use('/report-types', require('./report-types'))
router.use('/reports', require('./reports'))


module.exports = router