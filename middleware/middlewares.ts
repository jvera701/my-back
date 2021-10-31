import jwt = require('jsonwebtoken')
import { config } from '../config/environment/index'
import UserController = require('../api/user/user.controller')

// TODO: refactor this
const auth = async (req, res, next) => {
  try {
    const token = req.get('Authorization')
    const data = jwt.verify(token, config.jwtKey)
    const user = await UserController.findById({ _id: data._id })
    if (user) {
      res.locals.user = user
      next()
    } else {
      res.status(401).json({ error: 'User not found' })
      return
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Invalid Token' })
      return
    }
    next(err)
  }
}
export default auth
