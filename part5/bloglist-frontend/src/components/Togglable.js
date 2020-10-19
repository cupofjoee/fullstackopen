import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => toggleVisibility()}>{props.show}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => toggleVisibility()}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  show: PropTypes.string.isRequired
}

Togglable.displayName = 'togglable'

export default Togglable