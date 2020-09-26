import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ isError, setIsError ] = useState(false)

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
          setMessage(`Added ${person.name}`)
          setIsError(false)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

  }

  const updatePersonId = (id, changedPerson) => {
    const result = window.confirm(`${changedPerson.name} is already added to phonebook,\
    replace the old number with a new one?`)
    if (result) {
      personService
        .update(id, changedPerson)
        .then(changedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : changedPerson))
        })
        .catch(error => {
          setMessage(`Information of ${changedPerson.name} has already been removed from server`)
          setIsError(true)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
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
      <Notification message={message} isError={isError} />
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