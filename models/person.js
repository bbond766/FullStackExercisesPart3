/* eslint-disable no-undef */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  // eslint-disable-next-line no-unused-vars
  .then(_result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  id: { type: Number },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)