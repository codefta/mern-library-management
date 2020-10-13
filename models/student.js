const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const timestamp = require('./plugin/timestamp')
const toJson = require('./plugin/toJson')

const schema = mongoose.Schema({
  studentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  birthOfDate: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.model('Student', schema)
