import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable show="show..." hide="hide...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display:none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display:none')
  })

  test('after clicking the button the second time, children are not displayed', () => {
    const showButton = component.getByText('show...')
    const hideButton = component.getByText('hide...')

    fireEvent.click(showButton)
    const div = component.container.querySelector('.togglableContent')
    
    expect(div).not.toHaveStyle('display:none')

    fireEvent.click(hideButton)
    expect(div).toHaveStyle('display:none')

  })
})