const router = require('express').Router()
const studentService = require('../services/studentService')
const { jwtAuth } = require('../utils/middleware')

router.get('/', jwtAuth(true), async (req, res) => {
  const students = await studentService.getAll()

  res.status(200).json(students)
})

router.get('/:id', jwtAuth(true), async (req, res) => {
  const student = await studentService.getId(req.params.id)

  res.status(200).json(student)
})

router.post('/', jwtAuth(true), async (req, res) => {
  const studentSaved = await studentService.create(req.body)

  res.status(201).json(studentSaved)
})

router.put('/:id', jwtAuth(true), async (req, res) => {
  const studentUpdated = await studentService.update(req.params.id, req.body)

  res.status(201).json(studentUpdated)
})

router.delete('/:id', jwtAuth(true), async (req, res) => {
  const studentDeleted = await studentService.remove(req.params.id)

  res.status(204).json(studentDeleted)
})

module.exports = router
