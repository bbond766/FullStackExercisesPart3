require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))
app.use(logger)

let id = 0
let numEntries = 1//persons.length
let date = new Date()
let message = `<div>Phonebook has info for ${numEntries} people</div>
	<div>${date}</div>`

app.get('/', (req, res) =>{
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request,response) =>{
	Person.find({}).then(person => {
		response.json(person)
	})
})

app.get('/info', (request,response)=>{
	response.send(message)	
})

app.get('/api/persons/:id', (request, response) =>{
	id = Number(request.params.id)
	Person.findById(id).then(person => {
		if(person){
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res) =>{
	id = Number(req.params.id)
	Person.deleteOne({id: id}).then(result => {
		response.status(204).end()
	  })
	  .catch(error => next(error))
})

app.post('/api/persons', (req,res) =>{
	var id = 0
	
	if(req.body.id){
		id = req.body.id
	} else{
		id = Math.round(Math.random()*1000)
	}

	const person = new Person({
		name: req.body.name,
		number: req.body.number,
		id: id
	})
	

	if(!person.name){
		return res.status(400).json({error: 'Name is missing'})
	}
	if(!person.number){
		return res.status(400).json({error: 'Number is missing'})
	}
	/*if(person.find(persons => persons.name === person.name)){
		return res.status(400).json({error: 'Name must be unique'})
	}*/

	console.log(person)

	person.save().then(savedPerson => {
		res.json(savedPerson.toJSON())
	})
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
  
	if (error.name === 'CastError') {
	  return response.status(400).send({ error: 'malformatted id' })
	} 
  
	next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () =>{
	console.log(`Server running on port ${PORT}`)
})