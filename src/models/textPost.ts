import { model, Schema } from 'mongoose'

const PostModel = 'textPost'
const PostSchema = new Schema({
  keyName: {
    type: String,
    required: [true, 'User keyName missing'],
  },
  data: {
    type: Buffer,
  },
})

module.exports = model(PostModel, PostSchema)
