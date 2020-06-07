import React, { FunctionComponent, useState } from 'react'
import { makeStyles, Button, TableHead, TableRow, TableCell, TableSortLabel, Table, TableContainer, TableBody } from '@material-ui/core'

type Order = 'asc' | 'desc'
type Status = 'Activo' | 'Inactivo'

type keysTable = 'id' | 'name' | 'year' | 'createdAt' | 'updatedAt' | 'status'

interface HeaderKeys {
  label: string
  sort: boolean,
  key: keysTable
}

interface BodyKeys {
  id: number
  name: string
  year: number,
  createdAt: string
  status: Status
  updatedAt?: string
}

const useStyles = makeStyles(({ palette }) => ({
  containerMovies: {

  },
  headerMovie: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: '26px',
    lineHeight: '32px',
    color: palette.primary.main
  },
  newMovie: {

  },
  containerTable: {

  },
  headerTable: {
    width: '100%'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))


const headerTable: Array<HeaderKeys> = [
  { label: 'ID', sort: true, key: 'id' },
  { label: 'Nombre', sort: true, key: 'name' },
  { label: 'Año', sort: true, key: 'year' },
  { label: 'F. Publicación', sort: true, key: 'createdAt' },
  { label: 'F. Actualizacion', sort: true, key: 'updatedAt' },
  { label: 'Estado', sort: true, key: 'status' }
]

const bodyTable: Array<BodyKeys> = [
  { id: 1, name: 'Sueños de fuga', year: 1990, createdAt: '20/10/2020', status: 'Activo' },
  { id: 2, name: 'El padrino', year: 1970, createdAt: '20/10/2020', status: 'Activo' },
  { id: 3, name: 'El señor de los anillos: El retorno del rey', year: 2003, createdAt: '20/10/2020', status: 'Activo' },
  { id: 4, name: 'Batman', year: 2008, createdAt: '20/10/2020', status: 'Activo' },  
  { id: 5, name: 'Tiempos violentos', year: 1990, createdAt: '20/10/2020', status: 'Inactivo' },
]

const Movies: FunctionComponent = () => {
  const [orderBy, setOrderBy] = useState<keysTable>('id')
  const [orientation, setOrientation] = useState<Order>('asc')
  const classes = useStyles()
  
  const createSortHandler = (key: keysTable) => {
    const isAsc = orderBy === key && orientation === 'asc';
    setOrientation(isAsc ? 'desc' : 'asc');
    setOrderBy(key)
  }

  return (
    <div className={classes.containerMovies}>
      <div className={classes.headerMovie}>
        <h2 className={classes.title}>Peliculas</h2>
        <Button variant="contained" color="primary"  className={classes.newMovie}>Nueva pelicula</Button>
      </div>
      <div className={classes.containerTable}>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHead className={classes.headerTable}>
              <TableRow>
                {headerTable.map(({ label, key }) => (
                  <TableCell
                    key={key}
                  // padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection='asc'
                  >
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? orientation : 'asc'}
                      onClick={() => createSortHandler(key)}
                    >
                      {label}
                      {orderBy === key ? (
                    <span className={classes.visuallyHidden}>
                      {orientation === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                bodyTable.map(({ id, name, year,createdAt, updatedAt, status }) => (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.name)}
                    key={id}
                  >
                    <TableCell component="th" scope="row">{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{year}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{updatedAt}</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Movies