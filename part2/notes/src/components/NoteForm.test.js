import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NoteForm from './NoteForm'
import '@testing-library/jest-dom/extend-expect'

test('title of the test', () => {
  const createNote = jest.fn()

  const component = render(
    <NoteForm createNote={createNote} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier'}
  })
  fireEvent.submit(form)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe("testing of forms could be easier")
})