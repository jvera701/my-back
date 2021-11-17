import User from '../user/user.model'
import Token from './token.model'
import Crypto from 'crypto'
import bcrypt from 'bcrypt'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendMail(to, subject, text) {
  const from = 'Educas <javera701@gmail.com>'
  const msg = {
    to,
    from,
    subject,
    text,
  }
  try {
    await sgMail.send(msg)
  } catch (e) {
    console.error(e)
  }
}

export async function requestReset(req, res, next) {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user)
      return res.status(400).send("User with given email doesn't exist")

    let token = await Token.findOne({ userId: user._id })
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: Crypto.randomBytes(4).toString('hex'),
      }).save()
    }

    sendMail(
      email,
      'Request to reset your password',
      'Please put this code to reset your password \n\n' + token.token
    )

    res.status(204).end()
  } catch (e) {
    console.error(e)
  }
}

export async function passwordReset(req, res, next) {
  const { email, token, password } = req.body
  const user = await User.findOne({ email: email })
  if (!user) return res.status(400).send('Invalid code or expired')

  const tokenObject = await Token.findOne({
    userId: user._id,
    token: token,
  })
  if (!tokenObject) return res.status(400).send('Invalid code or expired')
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      throw err
    }
    user.password = hash
    await user.save()
    await tokenObject.delete()
  })

  res.status(200).send('Password reset successfully.')
}
