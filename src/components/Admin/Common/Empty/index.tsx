import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core'
import { EmptyLogo } from 'components/Icons'

interface Props {
  title?: string
}

const useStyles = makeStyles(({ palette }) => ({
  containerEmpty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyTitle: {
    color: palette.primary.main,
    fontWeight: 'bold'
  }
}))

const Empty: FunctionComponent<Props> = ({ title = 'No hay resultados para mostrar' }) => {
  const classes = useStyles()
  return (
    <div className={classes.containerEmpty}>
      <EmptyLogo width="600" height="350" />
      <p className={classes.emptyTitle}>{title}</p>
    </div>
  )
}

export default Empty