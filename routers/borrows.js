const router = require('express').Router()
const borrowService = require('../services/borrowService')
const { jwtAuth } = require('../utils/middleware')

router.get('/', jwtAuth(), async (req, res) => {
  const borrows = await borrowService.getAll(req.token)
  res.status(200).json(borrows)
})

router.get('/:id', jwtAuth(), async (req, res) => {
  const borrow = await borrowService.getId(req.params.id, req.token)
  res.status(200).json(borrow)
})

router.post('/', jwtAuth(), async (req, res) => {
  const staffId = req.token.id

  const newBorrow = await borrowService.create(req.body, staffId)
  res.status(201).json(newBorrow)
})

router.put('/:id', jwtAuth(), async (req, res) => {
  const id = req.params.id
  const body = req.body
  const staffId = req.token.id

  const borrowUpdated = await borrowService.updateReturnedBook(
    body,
    id,
    staffId
  )
  res.status(201).json(borrowUpdated)
})

router.delete('/:id', jwtAuth(), async (req, res) => {
  const id = req.params.id

  const borrowDeleted = await borrowService.remove(id, req.token)
  res.status(204).json(borrowDeleted)
})

module.exports = router
