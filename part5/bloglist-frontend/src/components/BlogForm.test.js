import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test("create new blog", () => {
  const handleCreate = jest.fn()
  const component = render(
    <BlogForm handleCreate={handleCreate} />
  )

  const inputTitle = component.container.querySelector('.inputTitle')
  const inputAuthor = component.container.querySelector('.inputAuthor')
  const inputUrl = component.container.querySelector('.inputUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: "Joe"}
  })

  fireEvent.change(inputAuthor, {
    target: { value: "authorjoe"}
  })

  fireEvent.change(inputUrl, {
    target: { value: "urljoe"}
  })

  fireEvent.submit(form)

  expect(handleCreate.mock.calls[0][0].title).toBe("Joe")
  expect(handleCreate.mock.calls[0][0].author).toBe("authorjoe")
  expect(handleCreate.mock.calls[0][0].url).toBe("urljoe")

})