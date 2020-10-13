const config = require('./utils/config')
const middleware = require('./utils/middleware')

// Import libraries
const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')

// import routers
const loginRouter = require('./routers/login')
const departmentsRouter = require('./routers/departments')
const categoryRouter = require('./routers/categories')
const booksRouter = require('./routers/books')
const studentsRouter = require('./routers/students')
const staffRouter = require('./routers/staff')
const borrowsRouter = require('./routers/borrows')

mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongodb connected')
  })
  .catch((err) => {
    console.log('mongodb error: ' + err.message)
  })

app.use(
  middleware.morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
)

app.use(helmet())
app.use(express.json())
app.use(cors())

// Routers
app.use('/api/v1/books', booksRouter)
app.use('/api/v1/students', studentsRouter)
app.use('/api/v1/staff', staffRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/departments', departmentsRouter)
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/borrows', borrowsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
