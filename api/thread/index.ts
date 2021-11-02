import * as ThreadController from './thread.controller'
import express = require('express')
import auth from '../../middleware/middlewares'
const app = express.Router()

app.get('/:courseId', auth, ThreadController.getThreads)
export { app }
