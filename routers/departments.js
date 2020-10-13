const router = require('express').Router()
const departmentService = require('../services/departmentService')
const { jwtAuth } = require('../utils/middleware')

router.get('/', jwtAuth(), async (req, res) => {
  const departments = await departmentService.getAll()
  res.status(200).json(departments)
})

router.get('/:id', jwtAuth(), async (req, res) => {
  const department = await departmentService.getId(req.params.id)
  res.status(200).json(department)
})

router.post('/', jwtAuth(), async (req, res) => {
  const newDepartment = await departmentService.create(req.body)
  res.status(201).json(newDepartment)
})

router.put('/:id', jwtAuth(), async (req, res) => {
  const body = req.body
  const id = req.params.id

  const departmentUpdated = await departmentService.update(body, id)
  res.status(201).json(departmentUpdated)
})

router.delete('/:id', jwtAuth(), async (req, res) => {
  const id = req.params.id

  const departmentDeleted = await departmentService.remove(id)
  res.status(204).json(departmentDeleted)
})

module.exports = router
