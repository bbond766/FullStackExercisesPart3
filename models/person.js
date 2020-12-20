import { connect, Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const url = process.env.MONGODB_URI

console.log('connecting to', url)

connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(result =>{
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to mongoDB:', error.message)
    })

const personSchema = new Schema({
    name: {type: String, required: true, unique: true},
    number: {type: String, required: true},
    id: {type: Number},
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

export default model('Person', personSchema)