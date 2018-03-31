const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/AuthController')
const ReportTypeController = require('../../controllers/ReportTypeController')


router.get('/', AuthController.required, ReportTypeController.getAll)
router.post('/', AuthController.required, ReportTypeController.add)


module.exports = router