const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const MONGO_URI = 'mongodb://127.0.0.1:27017/dcryptio-api'

const start = uri => {
  const mongoUri = uri || process.env.MONGO_URI || MONGO_URI
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
