import React, { FunctionComponent, useState, useEffect } from 'react'
import clsx from 'clsx'
import xdate from 'xdate'
import { makeStyles, Button, TableHead, TableRow, TableCell, TableSortLabel, Table, TableContainer, TableBody,
  Dialog, DialogActions, DialogTitle
 } from '@material-ui/core'
import { 
  Edit as EditIcon,
  Delete as DeleteIcon 
} from '@material-ui/icons'
import ModalMovie from 'components/Admin/Movies/ModalMovie'

type Order = 'asc' | 'desc'
export type Status = 'Activo' | 'Inactivo'
export type ActionModal = 'edit' | 'create'

type MovieKeys = 'id' | 'name' | 'year' | 'createdAt' | 'updatedAt' | 'status'

interface HeaderKeys {
  label: string
  sort: boolean,
  key: MovieKeys
}

export interface Movie {
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
  table: {
    minWidth: 1200
  },
  tableRow: {
    '&:hover': {
      '& $tableCellEdit': {
        opacity: 1,
        transition: 'all .15s ease'
      }
    }
  },
  tableCellEdit: {
    opacity: 0,
    transition: 'all .15s ease'
  },
  icons: {
    cursor: 'pointer'
  },
  editIcon: {
    marginRight: 15
  }
}))


const headerTable: Array<HeaderKeys> = [
  { label: 'ID', sort: true, key: 'id' },
  { label: 'Nombre', sort: true, key: 'name' },
  { label: 'Año', sort: true, key: 'year' },
  { label: 'F. Publicación', sort: true, key: 'createdAt' },
  { label: 'F. Actualizacion', sort: true, key: 'updatedAt' },
  { label: 'Estado', sort: true, key: 'status' }
]

const MoviesArr: Array<Movie> = [
  { id: 1, name: 'Sueños de fuga', year: 1990, createdAt: '20/10/2020', status: 'Activo' },
  { id: 2, name: 'El padrino', year: 1970, createdAt: '20/10/2020', status: 'Activo' },
  { id: 3, name: 'El señor de los anillos: El retorno del rey', year: 2003, createdAt: '20/10/2020', status: 'Activo' },
  { id: 4, name: 'Batman', year: 2008, createdAt: '20/10/2020', status: 'Activo' },  
  { id: 5, name: 'Tiempos violentos', year: 1990, createdAt: '20/10/2020', status: 'Inactivo' },
]

const initialMovie: Movie = {
  id: 0,
  name: '',
  year: new xdate().getFullYear(),
  createdAt: '',
  updatedAt: '',
  status: 'Inactivo'
  }

const Movies: FunctionComponent = () => {
  const [orderBy, setOrderBy] = useState<MovieKeys>('createdAt')
  const [orientation, setOrientation] = useState<Order>('asc')
  const [bodyTable, setBodyTable] = useState<Array<Movie>>([])
  const [actionModal, setActionModal] = useState<ActionModal>('create')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [selectMovie, setSelectMovie] = useState<Movie>(initialMovie)
  const [idDelete, setIdDelete] = useState<number | null>(null)
  const classes = useStyles()

  useEffect(() => {
   const localDash = localStorage.getItem('dashboardCinema')
   if(localDash){
     const { movies } = JSON.parse(localDash)
     setBodyTable(movies)
   } else {
     const localMovies = JSON.stringify({ movies: MoviesArr })
     localStorage.setItem('dashboardCinema', localMovies)
     setBodyTable(MoviesArr)
   }
  }, [])
  
  const handlerCreateSort = (key: MovieKeys) => {
    const isAsc = orderBy === key && orientation === 'asc';
    setOrientation(isAsc ? 'desc' : 'asc');
    setOrderBy(key)
  }

  const handlerCreateMovie = () => {
    setActionModal('create')
    setOpenModal(true)
    const [{ id }] = bodyTable.reverse()
    setSelectMovie({
      ...initialMovie,
      id: id + 1
    })
  }

  const handlerEditMovie = (id: number) => {
    setActionModal('edit')
    setOpenModal(true)
    const resultFind = bodyTable.find(({ id: idList }) => idList === id)
    if(resultFind)
      setSelectMovie(resultFind)
  }

  const handlerDeleteMovie = (id: number) => {
    setIdDelete(id)
    setOpenConfirm(true)
  }

  const handlerConfirDelete = () => {
    if (idDelete !== null) {
      const newList = bodyTable.filter(({ id: localId }) => localId !== idDelete)
      setNewMoviesLocal(newList)
      setOpenConfirm(false)
      setIdDelete(null)
    }
  }

  const handlerCloseModal = () => {
    setOpenModal(false)
  }

  const setNewMoviesLocal = (movies: Array<Movie>) => {
    const oldLocal = JSON.parse(localStorage.getItem('dashboardCinema') || '')
    const newLocal = {
      ...oldLocal,
      movies: movies
    }
    localStorage.setItem('dashboardCinema', JSON.stringify(newLocal))
    setBodyTable(movies)
    setOpenModal(false)
  }

  const handlerAdd = (movie: Movie) => {
    console.log("handlerAdd -> movie", movie)
    if(actionModal === 'edit'){
      const newListMovies = bodyTable.map((prevMovie) => prevMovie.id === movie.id ? movie : prevMovie)
      setNewMoviesLocal(newListMovies)

    } else {
      const oldBody = bodyTable
      oldBody.push(movie)
      setNewMoviesLocal(oldBody)
    }
  }

  return (
    <>
    <div className={classes.containerMovies}>
      <div className={classes.headerMovie}>
        <h2 className={classes.title}>Peliculas</h2>
          <Button variant="contained" onClick={handlerCreateMovie} color="primary"  className={classes.newMovie}>Nueva pelicula</Button>
      </div>
      <div className={classes.containerTable}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHead className={classes.headerTable}>
              <TableRow>
                {headerTable.map(({ label, key }) => (
                  <TableCell key={key} sortDirection='asc'>
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? orientation : 'asc'}
                      onClick={() => handlerCreateSort(key)}>
                        {label}
                        {orderBy === key ? (
                        <span className={classes.visuallyHidden}>
                          {orientation === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                        ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {
                bodyTable.map(({ id, name, year,createdAt, updatedAt, status }) => (
                  <TableRow
                    className={classes.tableRow}
                    hover key={id}>
                    <TableCell component="th" scope="row">{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{year}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{updatedAt}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell align="center" className={classes.tableCellEdit}>
                      <EditIcon onClick={() => handlerEditMovie(id)} className={clsx([classes.editIcon, classes.icons])} />
                      <DeleteIcon onClick={() => handlerDeleteMovie(id)} className={clsx([classes.icons])} />
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    { openModal ? <ModalMovie movie={selectMovie} action={actionModal} isOpen={openModal} onHandlerClose={handlerCloseModal} onHandlerAdd={handlerAdd} /> : null }
    {
      openConfirm ? (
          <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>¿Desea eliminar esta pelicula?</DialogTitle>
            <DialogActions>
              <Button onClick={() => setOpenConfirm(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={handlerConfirDelete} color="secondary" variant="contained" autoFocus>
                Eliminar
          </Button>
            </DialogActions>
          </Dialog>
      ) : null
    }
    
    </>
  )
}

export default Movies