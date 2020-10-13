const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('./config')

morgan.token('body', (req, res) => {
  if (req.method === 'post' || req.method === 'put') {
    return JSON.stringify(req.body)
  }
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebToken') {
    res.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'AuthError') {
    res.status(401).json({ error: error.message })
  }

  next()
}

const jwtAuth = (isAdmin = false) => {
  return (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = authorization.substring(7)
      const verify = jwt.verify(token, config.JWT_SECRET)

      if (!token || !verify.id) {
        res.status(401).json({ error: 'invalid token' })
      }

      if (isAdmin) {
        if (verify.isAdmin === true) {
          req.token = verify
        } else {
          res.status(401).json({ error: 'invalid token' })
        }
      } else {
        req.token = verify
      }

      next()
    } else {
      res.status(401).json({ error: 'invalid token' })
    }
  }
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler,
  jwtAuth,
}
