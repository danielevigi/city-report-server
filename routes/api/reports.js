const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/AuthController')
const ReportController = require('../../controllers/ReportController')


router.get('/', AuthController.required, ReportController.getAll)
router.post('/', AuthController.required, ReportController.add)


module.exports = router