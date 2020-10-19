import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const handleLike = jest.fn()

  beforeEach(() => {
    const blog = {
      title: "Blog title",
      author: "Teddy",
      url: "url",
      likes: 5,
    }
    component = render(
      <Blog blog={blog} handleLike={handleLike} />
    )
  })

  test('render blog', () => {
    expect(component.container.querySelector(".header")).toBeDefined()
  })

  test('content of blog is hidden at the start', () => {
    const header = component.container.querySelector(".header")
    expect(header).not.toHaveStyle("display:none")
    const content = component.container.querySelector(".content")
    expect(content).toHaveStyle("display:none")
  })

  test('after click, content should be shown', () => {
    const button = component.getByText("view")
    fireEvent.click(button)

    const header = component.container.querySelector(".header")
    expect(header).toHaveStyle("display:none")
    const content = component.container.querySelector(".content")
    expect(content).not.toHaveStyle("display:none")
  })

  test('liking a blog', () => {
    const likeButton = component.getByText("like")
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(1)
  })
})