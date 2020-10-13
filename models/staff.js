const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const timestamp = require('./plugin/timestamp')

const schema = mongoose.Schema({
  staffNumber: {
    type: String,
    required: true,
    min: 8,
    max: 8,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  birthOfDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
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

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('Staff', schema)
