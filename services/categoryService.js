const Category = require('../models/category')
const validator = require('../utils/helper')

const getAll = async () => {
  const categories = await Category.find({})

  return categories.map((b) => b.toJSON())
}

const getId = async (id) => {
  const category = await Category.findById(id)

  return category.toJSON()
}

const create = async (obj) => {
  validation(obj)

  const newCategory = new Category({
    name: obj.name,
    information: obj.information,
  })

  const categorySaved = await newCategory.save()

  return categorySaved.toJSON()
}

const update = async (obj, id) => {
  validation(obj)

  const categoryToUpdate = {
    name: obj.name,
    information: obj.information,
  }

  const categoryUpdated = await Category.findByIdAndUpdate(
    id,
    categoryToUpdate,
    {
      new: true,
    }
  )

  return categoryUpdated.toJSON()
}

const remove = async (id) => {
  const categoryToDelete = await Category.findByIdAndDelete(id)
  return categoryToDelete
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
