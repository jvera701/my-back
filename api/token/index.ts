import express = require('express')
import * as TokenController from './token.controller'
const app = express.Router()

app.post('/request-reset', TokenController.requestReset)
app.post('/password-reset', TokenController.passwordReset)

export { app }
