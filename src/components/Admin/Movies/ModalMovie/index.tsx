import React, { FunctionComponent, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, InputLabel, Select, FormControl, MenuItem, TextField, DialogActions, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import xdate from 'xdate'
import { ActionModal, Movie, Status } from 'containers/views/Admin/Movies'


interface Props {
  action: ActionModal
  movie: Movie
  isOpen: boolean
  onHandlerClose: () => void
  onHandlerAdd: (movie: Movie) => void
}

const ModalMovie: FunctionComponent<Props> = ({ action, isOpen, movie, onHandlerClose, onHandlerAdd }): JSX.Element => {
  const [localMovie, setLocalMovie] = useState<Movie>(movie)

  const handlerForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget
    setLocalMovie((prevStatus) => {
      return {
        ...prevStatus,
        [name]: value
      }
    })
  }

  const handlerSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as Status
    setLocalMovie((prevState) => {
      return {
        ...prevState,
        status: value
      }
    })
  }

  const updateDate = (): Movie => {
    return {
      ...localMovie,
      updatedAt: action === 'edit' ? new xdate().toString('dd/MM/yyyy') : '',
      createdAt: action === 'create' ? new xdate().toString('dd/MM/yyyy') : localMovie.createdAt,
    }
  }


  return (
    <Dialog maxWidth="md" open={isOpen} onClose={onHandlerClose} aria-labelledby="form-dialog-title">
      <DialogTitle>{ action === 'edit' ? 'Editar' : 'Crear'} Pelicula</DialogTitle>
      <DialogContent>
        <TextField required label="Nombre" onChange={handlerForm} name="name" defaultValue={localMovie.name} fullWidth autoFocus margin="dense" />
        <TextField required label="Año" name='year' onChange={handlerForm} defaultValue={localMovie.year} fullWidth type='number' margin="dense" />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="status"
            defaultValue={localMovie.status}
            value={localMovie.status}
            onChange={handlerSelect}
          >
            <MenuItem value={'Activo'}>Activo</MenuItem>
            <MenuItem value={'Inactivo'}>Inactivo</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHandlerClose} color="secondary">
          Cancelar
          </Button>
        <Button onClick={() => onHandlerAdd(updateDate())} variant="contained" color="primary">
          Guardar
          </Button>
      </DialogActions>
    </Dialog>
  )
}

ModalMovie.propTypes = {
  action: PropTypes.oneOf<ActionModal>(['edit', 'create']).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onHandlerClose: PropTypes.func.isRequired,
  onHandlerAdd: PropTypes.func.isRequired
}

export default ModalMovie
