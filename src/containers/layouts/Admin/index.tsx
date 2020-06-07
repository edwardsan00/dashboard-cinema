import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Grid } from '@material-ui/core'
import HeaderMain from 'components/Admin/Header'
import Sidebar from 'components/Admin/Sidebar'

const useStyles = makeStyles(({ palette }) => ({
  containerAdmin: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    minWidth: 900,
    maxWidth: '100%',
  },
  containerWrapper: {
    width: '100%',
    height: '100%'
  },
  containerBox: {
    width: 'calc(100% - 40px)',
    height: 'calc(100% - 40px)',
    margin: '20px auto',
    overflow: 'auto',
  }
}))

const Admin: FunctionComponent = ({ children }): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.containerAdmin}>
      <HeaderMain />
      <Grid container className={classes.containerWrapper}>
        <Grid item xs={3} lg={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} lg={10}>
          <div className={classes.containerBox}>
            {children}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Admin.propTypes = { 
  children: PropTypes.node.isRequired
}

export default Admin