import * as CommentController from './comment.controller'
import auth from '../../middleware/middlewares'
import express = require('express')
const app = express.Router()

app.post('/comment', auth, CommentController.createComment)

export { app }
