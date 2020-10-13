const router = require('express').Router()
const categoryService = require('../services/categoryService')
const { jwtAuth } = require('../utils/middleware')

router.get('/', jwtAuth(), async (req, res) => {
  const categories = await categoryService.getAll()
  res.status(200).json(categories)
})

router.get('/:id', jwtAuth(), async (req, res) => {
  const category = await categoryService.getId(req.params.id)
  res.status(200).json(category)
})

router.post('/', jwtAuth(), async (req, res) => {
  const newCategory = await categoryService.create(req.body)
  res.status(201).json(newCategory)
})

router.put('/:id', jwtAuth(), async (req, res) => {
  const body = req.body
  const id = req.params.id

  const categoryUpdated = await categoryService.update(body, id)
  res.status(201).json(categoryUpdated)
})

router.delete('/:id', jwtAuth(), async (req, res) => {
  const id = req.params.id

  const categoryDeleted = await categoryService.remove(id)
  res.status(204).json(categoryDeleted)
})

module.exports = router
