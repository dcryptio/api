const mongoose = require('mongoose')
const Schema = mongoose.Schema

const model = 'image'
const ImageSchema = new Schema({
  keyName: {
    type: String,
    required: [true, 'User keyName missing'],
  },
  data: {
    type: Buffer
  },
})

module.exports = mongoose.model(model, ImageSchema)
