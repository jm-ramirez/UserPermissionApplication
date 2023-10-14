import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createPermission, fetchPermissions } from '../services/api';

function PermissionForm() {
  const [formData, setFormData] = useState({
    nombreEmpleado: 'Pedro',
    apellidoEmpleado: 'Escamoso',
    fechaPermiso: '2023-10-14T03:40:45.667Z',
    tipoPermisoNombre: 'Jefe',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchPermissions()
      // Maneja la respuesta de la API según sea necesario
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre del Empleado"
        name="NombreEmpleado"
        value={formData.NombreEmpleado}
        onChange={handleChange}
      />
      <TextField
        label="Apellido del Empleado"
        name="ApellidoEmpleado"
        value={formData.ApellidoEmpleado}
        onChange={handleChange}
      />
      <TextField
        label="Fecha de Permiso"
        name="FechaPermiso"
        type="datetime-local"
        value={formData.FechaPermiso}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel>Tipo de Permiso</InputLabel>
        <Select
          name="TipoPermiso"
          value={formData.TipoPermiso}
          onChange={handleChange}
        >
          <MenuItem value={1}>Permiso Tipo 1</MenuItem>
          <MenuItem value={2}>Permiso Tipo 2</MenuItem>
          {/* Agrega más tipos de permiso según tu base de datos */}
        </Select>
      </FormControl>
      <Button variant="contained" type="submit">
        Enviar Permiso
      </Button>
    </form>
  );
}

export default PermissionForm;