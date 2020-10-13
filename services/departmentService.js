const Department = require('../models/department')
const validator = require('../utils/helper')

const getAll = async () => {
  const departments = await Department.find({})

  return departments.map((b) => b.toJSON())
}

const getId = async (id) => {
  const department = await Department.findById(id)

  return department.toJSON()
}

const create = async (obj) => {
  validation(obj)

  const newDepartment = new Department({
    name: obj.name,
    information: obj.information,
  })

  const departmentSaved = await newDepartment.save()

  return departmentSaved.toJSON()
}

const update = async (obj, id) => {
  validation(obj)

  const departmentToUpdate = {
    name: obj.name,
    information: obj.information,
  }

  const departmentUpdated = await Department.findByIdAndUpdate(
    id,
    departmentToUpdate,
    {
      new: true,
    }
  )

  return departmentUpdated.toJSON()
}

const remove = async (id) => {
  const departmentDeleted = await Department.findByIdAndDelete(id)
  return departmentDeleted
}

const validation = (obj) => {
  const rules = {
    name: 'required|string',
    information: 'string',
  }

  validator(obj, rules, {}, (err, status) => {
    if (!status) {
      throw { name: 'ValidationError', message: err }
    }
  })
}

module.exports = {
  getAll,
  getId,
  create,
  update,
  remove,
}
