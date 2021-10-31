import express from 'express'
import { app } from './api/user/index'

export default function routes(application: express.Application) {
  application.use(app)
}
