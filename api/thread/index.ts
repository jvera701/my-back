import * as ThreadController from './thread.controller'
import express = require('express')
import auth from '../../middleware/middlewares'
const app = express.Router()

app.get('/:courseId', auth, ThreadController.getThreads)
app.get('/thread/:threadId', auth, ThreadController.getThreadInformation)
app.post('/thread/search', auth, ThreadController.searchThreads)
app.post('/thread/filter', auth, ThreadController.filterThreads)
app.post('/thread/create', auth, ThreadController.createThread)
app.put('/thread', auth, ThreadController.updateThread)
app.delete('/thread', auth, ThreadController.deleteThread)
export { app }
