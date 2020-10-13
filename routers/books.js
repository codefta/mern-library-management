const router = require('express').Router()
const bookService = require('../services/bookService')
const { jwtAuth } = require('../utils/middleware')

router.get('/', jwtAuth(), async (req, res) => {
  const books = await bookService.getAll(req.token)
  res.status(200).json(books)
})

router.get('/:id', jwtAuth(), async (req, res, next) => {
  const book = await bookService.getId(req.params.id, req.token)
  res.status(200).json(book)
})

router.post('/', jwtAuth(), async (req, res) => {
  const newBook = await bookService.create(req.body, req.token)
  res.status(201).json(newBook)
})

router.put('/:id', jwtAuth(), async (req, res) => {
  const body = req.body
  const id = req.params.id

  const bookUpdated = await bookService.update(body, id, req.token)
  res.status(201).json(bookUpdated)
})

router.delete('/:id', jwtAuth(), async (req, res) => {
  const id = req.params.id

  const bookDeleted = await bookService.remove(id, req.token)
  res.status(204).json(bookDeleted)
})

module.exports = router
