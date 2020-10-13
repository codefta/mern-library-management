const router = require('express').Router()
const staffService = require('../services/staffService')
const { jwtAuth } = require('../utils/middleware')

router.get('/', jwtAuth(true), async (req, res) => {
  const staff = await staffService.getAll()
  res.status(200).json(staff)
})

router.get('/:id', jwtAuth(true), async (req, res) => {
  const staff = await staffService.getId(req.params.id)

  res.status(200).json(staff)
})

router.post('/', jwtAuth(true), async (req, res) => {
  const staffSaved = await staffService.create(req.body)

  res.status(201).json(staffSaved)
})

router.put('/:id', jwtAuth(true), async (req, res) => {
  const staffUpdated = await staffService.update(req.params.id, req.body)

  res.status(201).json(staffUpdated)
})

router.delete('/:id', jwtAuth(true), async (req, res) => {
  const staffDeleted = await staffService.remove(req.params.id)

  res.status(204).json(staffDeleted)
})

module.exports = router
