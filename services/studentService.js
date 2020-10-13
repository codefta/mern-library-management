const Student = require('../models/student')
const validator = require('../utils/helper')

const getAll = async () => {
  const students = await Student.find({})
  return students.map((s) => s.toJSON())
}

const getId = async (id) => {
  const student = await Student.findById(id)
  return student.toJSON()
}

const create = async (obj) => {
  validation(obj)

  const newStudent = new Student({
    studentNumber: obj.studentNumber,
    fullName: obj.fullName,
    gender: obj.gender,
    birthOfDate: obj.birthOfDate,
    department: obj.department,
    email: obj.email,
  })

  const studentSaved = await newStudent.save()

  return studentSaved.toJSON()
}

const update = async (id, obj) => {
  validation(obj)

  const studentToUpdate = {
    studentNumber: obj.studentNumber,
    fullName: obj.fullName,
    gender: obj.gender,
    birthOfDate: new Date(obj.birthOfDate),
    department: obj.department,
    email: obj.email,
  }

  const studentUpdated = await Student.findByIdAndUpdate(id, studentToUpdate, {
    new: true,
  })

  return studentUpdated.toJSON()
}

const remove = async (id) => {
  const studentDeleted = await Student.findByIdAndRemove(id)

  return studentDeleted
}

const validation = (obj) => {
  let rules = {
    studentNumber: 'required|string',
    fullName: 'string',
    gender: 'required|string',
    birthOfDate: 'required|date',
    department: 'required|string',
    email: 'required|email',
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
