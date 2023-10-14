import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { createPermissionType } from '../services/api';

function PermissionTypeForm() {
  const [formData, setFormData] = useState({
    Descripcion: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPermissionType(formData);
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
        label="Descripción del Tipo de Permiso"
        name="Descripcion"
        value={formData.Descripcion}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Crear Tipo de Permiso
      </Button>
    </form>
  );
}

export default PermissionTypeForm;