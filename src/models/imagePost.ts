import { model, Schema } from 'mongoose'

const ImageModel = 'imagePost'
const ImageSchema = new Schema({
  keyName: {
    type: String,
    required: [true, 'User keyName missing'],
  },
  data: {
    type: Buffer
  },
})

module.exports = model(ImageModel, ImageSchema)
