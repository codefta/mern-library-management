const Book = require('../models/book')
const validator = require('../utils/helper')

const getAll = async (token) => {
  const books = await Book.find({})

  return books.map((b) => b.toJSON())
}

const getId = async (id) => {
  const book = await Book.findById(id)

  if (!book) {
    throw { name: 'CastError' }
  }

  return book.toJSON()
}

const create = async (obj) => {
  validation(obj)

  const newBook = new Book({
    isbn: obj.isbn,
    title: obj.title,
    author: obj.author,
    publishedAt: obj.publishedAt,
    language: obj.language,
    category: obj.category,
  })

  const bookSaved = await newBook.save()

  return bookSaved.toJSON()
}

const update = async (obj, id) => {
  validation(obj)

  const bookToUpdate = {
    isbn: obj.isbn,
    title: obj.title,
    author: obj.author,
    publishedAt: obj.publishedAt,
    language: obj.language,
    category: obj.category,
  }

  const bookUpdated = await Book.findByIdAndUpdate(id, bookToUpdate, {
    new: true,
  })

  return bookUpdated.toJSON()
}

const remove = async (id) => {
  const bookToDelete = await Book.findByIdAndDelete(id)
  return bookToDelete
}

const validation = (obj) => {
  const rules = {
    isbn: 'required|numeric',
    title: 'required|string|min:8',
    author: 'required|string',
    publishedAt: 'required|numeric',
    language: 'required|string',
    category: 'array',
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
