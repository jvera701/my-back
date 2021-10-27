import { login, register } from './user.controller'
import express = require('express')
const app = express.Router()

app.post('/login', login)
app.post('/register', register)
export { app }
