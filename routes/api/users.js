const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/AuthController')
const UserController = require('../../controllers/UserController')


router.get('/', AuthController.required, UserController.getAll)
router.post('/', AuthController.required, UserController.add)


module.exports = router