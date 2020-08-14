import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialData => {setPersons(initialData)})
      .catch(error => console.log('fail'))
  }

  useEffect(hook, [])

  console.log("We have " + persons.length + " contacts")

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
      event.preventDefault()
      var person
      for (person of persons) {
          if (person.name.toLowerCase() === newName.toLowerCase()) {
            console.log("duplicate name")
            updatePersonId(person.id, {...person, number: newNumber})
            return null
          }
      }
      const newPerson = {
          name: newName,
          number: newNumber
      }
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
        })
        .catch(error => console.log('fail adding new contact'))
  }

  const updatePersonId = (id, changedPerson) => {
    const result = window.confirm(`${changedPerson.name} is already added to phonebook,\
    replace the old number with a new one?`)
    if (result) {
      personService.update(id, changedPerson)
      setPersons(persons.map(person => person.id !== id ? person : changedPerson))
      setNewName("")
      setNewNumber("")
    }
  }
  
  const deletePersonId = (id) => {
    personService.deletePerson(id)
    setPersons(persons.filter(person => person.id != id))
  }

  const personsToShow = persons.filter((person) => 
        person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        {personsToShow.map(person => 
          <Person person={person} deletePerson={() => deletePersonId(person.id)} />
        )}
    </div>
  )
}

export default App