const mongoose = require('mongoose')
const { MONGO_URI } = require('./constants')
mongoose.Promise = global.Promise

const start = uri => {
  const mongoUri = uri || MONGO_URI
  mongoose.connect(mongoUri)
  const db = mongoose.connection
  db.on('connected', () => console.log(`Connected MongoDB at: ${mongoUri}`))
  db.on('error', err => {
    console.error(`MongoDB connection uri: ${mongoUri} error: ${err}`)
    process.exit(1)
  })
  return db
}

const disconnect = () => mongoose.disconnect()

module.exports = { start, disconnect }
