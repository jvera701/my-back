import express from 'express'
import { app as appUser } from './api/user/index'
import { app as appThread } from './api/thread/index'

export default function routes(application: express.Application) {
  application.use(appUser)
  application.use(appThread)
}
