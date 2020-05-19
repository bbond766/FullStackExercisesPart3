const express = require('express')
const app = express()

app.use(express.json())

let persons = [
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
]


let id = 0
let numEntries = persons.length
let date = new Date()
let message = `<div>Phonebook has info for ${numEntries} people</div>
	<div>${date}</div>`

app.get('/', (req, res) =>{
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req,res) =>{
	res.json(persons)
})

app.get('/info', (req,res)=>{
	res.send(message)	
})

app.get('/api/persons/:id', (request, response) =>{
	id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if(person){
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (req,res) =>{
	id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	res.status(204).end()
})

app.post('/api/persons', (req,res) =>{
	const person = req.body
	person.id = Math.round(Math.random()*1000)

	console.log(person)

	res.json(person)
})

const PORT = 3001
app.listen(PORT, () =>{
	console.log(`Server running on poer ${PORT}`)
})