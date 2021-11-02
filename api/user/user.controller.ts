import User from '../user/user.model'
import jwt = require('jsonwebtoken')
import configuration = require('./../../config/environment/index')
import bcrypt = require('bcrypt')

export async function authenticate(res, email, password) {
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

export async function login(req, res, next) {
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
        email,
      })
    } else
      res.status(401).json({ error: 'Invalid credentials, please try again' })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function register(req, res, next) {
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

export async function getUser(req, res) {
  const { email, name, role } = res.locals.user
  res.status(200).json({ email, name, role })
}

export async function findById(id) {
  return await User.findById(id)
}

export async function getHomeInfo(req, res, next) {
  try {
    const email = req.body.email
    const user = await User.findOne({ email: email }).populate('courses')
    const userCourses: any = user.courses.sort((a: any, b: any) => {
      if (a.period === b.period) return a.code < b.code ? -1 : 1
      else return a.period - b.period
    })
    const courses = []
    for (let i = 0; i < userCourses[userCourses.length - 1].period; i++) {
      courses.push([])
    }
    for (let i = 0; i < userCourses.length; i++) {
      const course = userCourses[i]
      courses[course.period - 1].push(course)
    }
    res.status(200).json(courses)
  } catch (error) {
    console.error(error)
    next(error)
  }
}
