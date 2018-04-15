const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ValidationError = mongoose.Error.ValidationError
const ValidatorError = mongoose.Error.ValidatorError

const model = 'post'
const PostSchema = new Schema({
  keyName: {
    type: String,
    required: [true, 'User keyName missing'],
  },
  data: {
    type: Buffer
  },
})

module.exports = mongoose.model(model, PostSchema)
