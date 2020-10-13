const Borrow = require('../models/borrow')
const validator = require('../utils/helper')
const moment = require('moment')

const getAll = async () => {
  const borrow = await Borrow.find({})

  return borrow.map((b) => b.toJSON())
}

const getId = async (id) => {
  const borrow = await Borrow.findById(id)

  return borrow.toJSON()
}

const create = async (obj, staffId) => {
  validation(obj)

  console.log(obj.book)

  const newBorrow = new Borrow({
    from: new Date(),
    to: moment(obj.from).add(14, 'days'),
    student: obj.student,
    staff: staffId,
    book: obj.book,
  })

  const borrowSaved = await newBorrow.save()

  return borrowSaved.toJSON()
}

const update = async (obj, id, staffId) => {
  validation(obj)

  const borrowToUpdate = {
    from: obj.from,
    to: moment(obj.from).add(14, 'days'),
    return: obj.return,
    student: obj.student,
    staff: staffId,
    book: obj.book,
  }

  const borrowUpdated = await Borrow.findByIdAndUpdate(id, borrowToUpdate, {
    new: true,
  })

  return borrowUpdated.toJSON()
}

const updateReturnedBook = async (obj, id, staffId) => {
  const borrowToUpdate = {
    return: obj.return,
    staff: staffId,
  }

  const borrowUpdated = await Borrow.findByIdAndUpdate(id, borrowToUpdate, {
    new: true,
  })

  return borrowUpdated.toJSON()
}

const remove = async (id) => {
  const borrowToDelete = await Borrow.findByIdAndDelete(id)
  return borrowToDelete
}

const validation = (obj) => {
  const rules = {
    student: 'required',
    book: 'required|array',
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
  updateReturnedBook,
}
