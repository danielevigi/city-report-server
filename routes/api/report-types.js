const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/AuthController')
const ReportTypeController = require('../../controllers/ReportTypeController')


router.get('/', AuthController.authenticateUser, ReportTypeController.getAll)
router.post('/', AuthController.authenticateAdmin, ReportTypeController.add)


module.exports = router