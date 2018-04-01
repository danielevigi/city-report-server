const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/AuthController')
const ReportController = require('../../controllers/ReportController')


router.get('/', AuthController.authenticateUser, ReportController.getAll)
router.post('/', AuthController.authenticateAdmin, ReportController.add)


module.exports = router