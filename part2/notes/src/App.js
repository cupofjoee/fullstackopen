import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)

    const hook = () => {
      console.log("Use Effect")
      axios
        .get("http://localhost:3001/notes")
        .then(response => {
          console.log("Promise fulfilled")
          setNotes(response.data)
        })
    }

    useEffect(hook, [])
    

    console.log('render', notes.length, 'notes')

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject =   {
          id: notes.length + 1,
          content: newNote,
          date: new Date().toISOString(),
          important: Math.random() < 0.5
        }
        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)

    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {notesToShow.map(note => 
              <Note key={note.id} note={note} />
            )}
        </ul>
        <form onSubmit={addNote}>
            <input 
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type="submit">save</button>
        </form>
      </div>
    )
  }

export default App