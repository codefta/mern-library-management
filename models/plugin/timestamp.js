const timestamp = (schema, options) => {
  schema.pre('save', (next) => {
    const now = new Date()

    this.modifiedAt = now

    if (!this.createdAt) {
      this.createdAt = now
    }

    next()
  })
}

module.exports = timestamp
