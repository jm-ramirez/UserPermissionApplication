import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  FormControl,
  MenuItem,
  Typography,
} from '@mui/material';
import { TypePermissionTypes } from '../../model/types';
import { getPermissionTypes } from '../../services/api';

const styles = {
  input: { marginBottom: '10px' }
}

export const NewPermission = () => {
  const [fechaCreacion, setFechaCreacion] = useState<Date | null>(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoPermiso, setTipoPermiso] = useState('');
  const [tipoPermisoCustom, setTipoPermisoCustom] = useState(''); // Campo de entrada de texto personalizado
  const [otherSelected, setOtherSelected] = useState(false);
  const [permissionTypesList, setPermissionTypesList] = useState<TypePermissionTypes[]>([]);

  const handleTipoPermisoChange = (event: any) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'other') {
      setOtherSelected(true);
    } else {
      setOtherSelected(false);
      setTipoPermiso(selectedValue);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const selectedTipoPermiso = otherSelected ? tipoPermisoCustom : tipoPermiso;
    // Aquí puedes enviar los datos del formulario al servidor, por ejemplo, utilizando Axios.
  };

  useEffect(() => {
    getPermissionTypes()
      .then((data) => {
        setPermissionTypesList(data);
      })
      .catch(() => {
        setPermissionTypesList([]);
      });
  }, []);
  
  return (
    <div>
      <Typography variant="h4" gutterBottom>
          Nuevo Permiso
      </Typography>
      <Button href="/">Volver</Button>
      <form onSubmit={handleSubmit}>
      <div className="custom-placeholder">
        <span className={`placeholder ${nombre ? 'hidden' : ''}`}>Nombre</span>
        <TextField
          fullWidth
          value={nombre}
          onChange={(e: any) => setNombre(e.target.value)}
          style={styles.input}
        />
      </div>
      <div className="custom-placeholder">
        <span className={`placeholder ${apellido ? 'hidden' : ''}`}>Apellido</span>
        <TextField
          fullWidth
          value={apellido}
          onChange={(e: any) => setApellido(e.target.value)}
          style={styles.input}
        />
      </div>
      <div className="custom-placeholder">
        <span className={`placeholder ${fechaCreacion ? 'hidden' : ''}`}>
          Fecha de Creación
        </span>
        <TextField
          type="date"
          fullWidth
          value={fechaCreacion}
          onChange={(e: any) => setFechaCreacion(e.target.value)}
          style={styles.input}
        />
      </div>
      <div className="custom-placeholder">
        <span className={`placeholder ${tipoPermiso || otherSelected ? 'hidden' : ''}`}>
          Tipo de Permiso
        </span>
        <FormControl fullWidth>
          <Select
            value={otherSelected ? 'other' : tipoPermiso}
            onChange={handleTipoPermisoChange}
            style={styles.input}
          >
            { permissionTypesList.map((row: TypePermissionTypes) => (
              <MenuItem value={row.id}>{row.descripcion}</MenuItem>
              )) 
            }
            <MenuItem value="other">Otro</MenuItem>
          </Select>
        </FormControl>
      </div>
      {otherSelected && (
        <div className="custom-placeholder">
          <span className={`placeholder`}>Nuevo tipo de permiso</span>
          <TextField
            fullWidth
            value={tipoPermisoCustom}
            onChange={(e: any) => setTipoPermisoCustom(e.target.value)}
            style={styles.input}
          />
        </div>
      )}
      <Button variant="contained" color="primary" type="submit">
        Crear Permiso
      </Button>
    </form>
    </div>
  )
}
