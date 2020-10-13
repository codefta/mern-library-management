const router = require('express').Router()
const loginService = require('../services/loginService')

router.post('/', async (req, res) => {
  const loggedIn = await loginService.login(req.body)

  res.status(200).json(loggedIn)
})

module.exports = router
