import React from 'react'

const Person = ({ person, deletePerson }) => {

    const confirmDelete = () => {
        const result = window.confirm(`Delete ${person.name}?`)
        if (result) {
            return deletePerson()
        }
    }
    
    return  (
    <p>
        {person.name} {person.number}
        <button onClick={confirmDelete}>delete</button>
    </p>
    )
}

export default Person