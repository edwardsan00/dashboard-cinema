import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

const Main: FunctionComponent = ({ children }): JSX.Element => {
  return (
    <div>
      <p>Main</p>
      { children }
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.node.isRequired
}

export default Main