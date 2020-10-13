const mongoose = require('mongoose')
const timestamp = require('./plugin/timestamp')
const toJson = require('./plugin/toJson')

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  information: {
    type: String,
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

schema.plugin(timestamp)
schema.plugin(toJson)

module.exports = mongoose.model('Category', schema)
