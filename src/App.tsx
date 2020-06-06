import React, { FunctionComponent } from 'react'
import { CssBaseline } from '@material-ui/core'
import RouterMain from './routes'


const App: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <CssBaseline />
      <RouterMain />
    </>
  )
}

export default App
