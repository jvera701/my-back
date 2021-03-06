import express from 'express'
import { app as appUser } from './api/user/index'
import { app as appThread } from './api/thread/index'
import { app as appComment } from './api/comment/index'
import { app as appToken } from './api/token/index'

export default function routes(application: express.Application) {
  application.use(appUser)
  application.use(appThread)
  application.use(appComment)
  application.use(appToken)
}
