import * as ThreadController from './thread.controller'
import express = require('express')
import auth from '../../middleware/middlewares'
const app = express.Router()

app.get('/:courseId', auth, ThreadController.getThreads)
app.get('/thread/:threadId', auth, ThreadController.getThreadInformation)
app.post('/thread/search', auth, ThreadController.searchThreads)
app.post('/thread/create', auth, ThreadController.createThread)
export { app }
