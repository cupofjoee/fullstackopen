import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: false,
    })
    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          id='note-form'
          type="text"
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button id='note-submit' type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm