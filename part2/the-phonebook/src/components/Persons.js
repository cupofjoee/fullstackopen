import React from 'react'

const Person = ({ person }) => {
    return <p>{person.name} {person.number}</p>
}

const Persons = ({ personsToShow }) => {
    return personsToShow.map((person) => <Person person={person} />)
}

export default Persons