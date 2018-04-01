const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/AuthController')
const UserController = require('../../controllers/UserController')


router.get('/', AuthController.authenticateUser, UserController.getAll)
router.post('/', AuthController.authenticateAdmin, UserController.add)


module.exports = router