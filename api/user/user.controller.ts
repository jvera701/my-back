import User from '../user/user.model'
import jwt = require('jsonwebtoken')
import configuration = require('./../../config/environment/index')
import bcrypt = require('bcrypt')

async function authenticate(res, email, password) {
  const user = await User.findOne({ email })
  if (user) {
    const result = await bcrypt.compare(password, user.password)
    if (result) {
      return user
    }
    return null
  } else {
    return null
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await authenticate(res, email, password)
    if (user) {
      const token = jwt.sign({ _id: user._id }, configuration.config.jwtKey)
      const { name, role } = user
      res.status(200).json({
        token,
        name,
        role,
      })
    } else
      res.status(401).json({ error: 'Invalid credentials, please try again' })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

async function register(req, res, next) {
  try {
    const { email, password, name, role } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
      res.status(422).json('Email is already taken, please use another one')
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          throw err
        }
        await User.create({
          email: email,
          password: hash,
          name: name,
          role: role,
        })
      })
      res.status(200).json('User successfully created')
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export { login, register }
