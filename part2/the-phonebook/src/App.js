import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    console.log("Fetching data")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
    console.log("Promise fulfilled")
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
              window.alert(newName + ' is already added to phonebook')
          }
      }
      const newPerson = {
          name: newName,
          number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App