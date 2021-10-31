import * as UserController from './user.controller'
import express = require('express')
import auth from '../../middleware/middlewares'
const app = express.Router()

app.post('/login', UserController.login)
app.post('/register', UserController.register)
app.get('/me', auth, UserController.getUser)
app.post('/home', auth, UserController.getHomeInfo)
export { app }
