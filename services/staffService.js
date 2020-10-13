const bcrypt = require('bcryptjs')
const Staff = require('../models/staff')
const validator = require('../utils/helper')

const getAll = async () => {
  const staff = await Staff.find({})
  return staff.map((s) => s.toJSON())
}

const getId = async (id) => {
  const staff = await Staff.findById(id)
  return staff.toJSON()
}

const create = async (obj) => {
  validation(obj, 'create')

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(obj.password, salt)

  const newStaff = new Staff({
    staffNumber: obj.staffNumber,
    fullName: obj.fullName,
    gender: obj.gender,
    birthOfDate: obj.birthOfDate,
    email: obj.email,
    passwordHash,
    isAdmin: obj.isAdmin,
  })

  const staffSaved = await newStaff.save()

  return staffSaved.toJSON()
}

const update = async (id, obj) => {
  validation(obj, 'update')

  const staffToUpdate = {
    staffNumber: obj.staffNumber,
    fullName: obj.fullName,
    gender: obj.gender,
    birthOfDate: obj.birthOfDate,
    email: obj.email,
    isAdmin: obj.isAdmin,
  }

  const staffUpdated = await Staff.findByIdAndUpdate(id, staffToUpdate, {
    new: true,
  })

  return staffUpdated.toJSON()
}

const remove = async (id) => {
  const staffDeleted = await Staff.findByIdAndRemove(id)

  return staffDeleted
}

const validation = (obj, type) => {
  let rules = {
    staffNumber: 'required|string',
    fullName: 'string',
    gender: 'required|string',
    birthOfDate: 'required|date',
    email: 'required|email',
    isAdmin: 'boolean',
  }

  if (type == 'create') {
    rules = { ...rules, password: 'required|passwd' }
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
