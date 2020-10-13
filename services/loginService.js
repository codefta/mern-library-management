const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Staff = require('../models/staff')
const validator = require('../utils/helper')

const login = async ({ email, password }) => {
  validation({ email, password })

  const user = await Staff.findOne({ email })

  const auth =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && auth)) {
    throw { name: 'AuthError', message: 'Invalid username or password!' }
  }

  const userLogged = {
    email: user.email,
    fullName: user.fullName,
    isAdmin: user.isAdmin,
    id: user._id,
  }

  const token = jwt.sign(userLogged, config.JWT_SECRET)

  return {
    token,
    fullName: user.fullName,
    email: user.email,
    isAdmin: user.isAdmin,
  }
}

const validation = (obj) => {
  const rules = {
    email: 'required|email',
    password: 'required',
  }

  validator(obj, rules, {}, (err, status) => {
    if (!status) {
      throw { name: 'ValidationError', message: err }
    }
  })
}

module.exports = { login }
