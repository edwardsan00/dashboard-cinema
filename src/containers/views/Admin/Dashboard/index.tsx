import React, { FunctionComponent } from 'react'
import {  makeStyles } from '@material-ui/core'
import Empty from 'components/Admin/Common/Empty'

const useStyles = makeStyles(({ palette }) => ({
  containerDash: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%'
  },
}))

const Dashboard: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <div className={classes.containerDash}>
      <Empty />
    </div>
  )
}

export default Dashboard