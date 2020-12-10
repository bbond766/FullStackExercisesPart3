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

/*let persons = [
	{
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]*/


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
	Person.find({}).then(person => {
		response.json(person)
	})
})

app.delete('/api/persons/:id', (req,res) =>{
	id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	res.status(204).end()
})

app.post('/api/persons', (req,res) =>{
	const person = req.body
	person.id = Math.round(Math.random()*1000)

	if(!person.name){
		return res.status(400).json({error: 'Name is missing'})
	}
	if(!person.numer){
		return res.status(400).json({error: 'Number is missing'})
	}
	if(persons.find(persons => persons.name === person.name)){
		return res.status(400).json({error: 'Name must be unique'})
	}

	console.log(person)

	res.json(person)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () =>{
	console.log(`Server running on port ${PORT}`)
})