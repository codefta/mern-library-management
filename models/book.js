const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const timestamp = require('./plugin/timestamp')
const toJson = require('./plugin/toJson')

const schema = mongoose.Schema({
  isbn: {
    type: String,
    minlength: 8,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  category: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
})

schema.plugin(uniqueValidator)
schema.plugin(timestamp)
schema.plugin(toJson)

module.exports = mongoose.model('Book', schema)
