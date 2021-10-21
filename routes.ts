import express from 'express';
import {app} from "./api/user/index"

export default function routes (appi : express.Application) {
  appi.use(app)
}
