const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length<3){
    console.log('Please provide the password as an argument: node.js <password>')
    process.exit(1)
} else if(process.argv.length == 4){
    const password = process.argv[2]

    connectToDatabase(password)
} else{
    const password = process.argv[2]

    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: 34,
    })

    connectToDatabase(password, newPerson)
}

function connectToDatabase(password, person){
    const url = `mongodb+srv://phonebook:${password}@cluster0.dplnp.mongodb.net/persons?retryWrites=true`

    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

    if(person.name == undefined){
        Person.find({}).then(result =>{
            result.forEach(person => {
                console.log(person)
            })
            console.log('databaes printed')
            mongoose.connection.close()
        })
    } else{
        person.save().then(result => {
            console.log(`added ${person.name} ${person.number} to phonebook`)
            mongoose.connection.close()
        })
    }
}



