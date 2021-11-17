import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import configure = require('./config/environment/index')
require('./api/user/user.model')
require('./api/course/course.model')
require('./api/thread/thread.model')
require('./api/comment/comment.model')
require('./api/token/token.model')
import routes from './routes'
import cors = require('cors')
import mongoose = require('mongoose')

const app: express.Application = express()
app.use(cors())
app.use(express.json())
const config = configure.config
app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})

//routes that will be used
routes(app)
mongoose.connect(config.dbConnectionString)
app.use((err, req, res) => {
  //res.status(500).json({ error: err.message })
  console.error(err)
})

mongoose.connection.on('error', function (e) {
  console.error(e)
})

export default { app }
