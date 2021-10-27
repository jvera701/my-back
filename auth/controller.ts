import jwt = require('jsonwebtoken')
import config = require('../config/environment/index')
import User = require('../api/user/user.model')

// TODO: refactor this
const auth = async (req, res, next) => {
  try {
    const token = req.get('Authorization')
    const data = jwt.verify(token, config.jwtKey)

    const user = await User.findOne({ _id: data.userId })
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
