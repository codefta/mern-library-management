const mongoose = require('mongoose')
const timestamp = require('./plugin/timestamp')
const toJson = require('./plugin/toJson')
const populate = require('mongoose-autopopulate')

const schema = mongoose.Schema({
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
  },
  return: {
    type: Date,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    autopopulate: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    autopopulate: true,
  },
  book: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      autopopulate: true,
    },
  ],
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

schema.plugin(timestamp)
schema.plugin(toJson)
schema.plugin(populate)

module.exports = mongoose.model('Borrow', schema)
