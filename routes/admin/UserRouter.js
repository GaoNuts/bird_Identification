const express = require('express')
const UserController = require('../../controllers/admin/UserController')
const UserRouter = express.Router()

UserRouter.post('/adminapi/user/login', UserController.login)
UserRouter.post('/adminapi/user/add', UserController.add)
module.exports = UserRouter