import React, { useEffect, useRef, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  FormControl,
  MenuItem,
  Typography,
} from '@mui/material';
import { TypePermissionTypes } from '../../model/types';
import { getPermissionTypes, requestPermissions } from '../../services/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const styles = {
  input: { marginBottom: '10px' }
}

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  fechaCreacion: Yup.date().required('La fecha de creación es obligatoria'),
  tipoPermiso: Yup.string().required('El tipo de permiso es obligatorio'),
  tipoPermisoCustom: Yup.string(), // Este campo es opcional y no tiene validación
});

export const NewPermission = () => {
  const navigate = useNavigate();
  const [permissionTypesList, setPermissionTypesList] = useState<TypePermissionTypes[]>([]);
  const nombreInputRef = useRef<HTMLInputElement | null>(null);
  
  const initialValues = {
    nombre: '',
    apellido: '',
    fechaCreacion: new Date().toISOString().substr(0, 10),
    tipoPermiso: '',
    tipoPermisoCustom: '', // Campo adicional para el tipo de permiso personalizado
  };

  const handleSubmit = async (values: any) => {
    
    try {
      const selectedTipoPermiso = values.tipoPermiso === "custom" ? values.tipoPermisoCustom : values.tipoPermiso;

      const response = await requestPermissions({
        nombreEmpleado: values.nombre,
        apellidoEmpleado: values.apellido,
        fechaPermiso: values.fechaCreacion ?? new Date(),
        tipoPermisoNombre: selectedTipoPermiso
      }); 

      if (response) {
        toast.success('El permiso se agregó exitosamente', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Cierra el toast automáticamente después de 3 segundos
          onClose: () => {
            navigate('/');
          },
        });   
      } else {
        toast.error('Hubo un error al agregar el permiso.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Cierra el toast automáticamente después de 3 segundos
        });     
      }
    } catch (error) {
      toast.error('Hubo un error al agregar el permiso.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Cierra el toast automáticamente después de 3 segundos
      });  
    }
  };

  useEffect(() => {
    if (nombreInputRef.current) {
      nombreInputRef.current.focus();
    }
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
        <Form>
          <div style={styles.input}>
            <span className={`placeholder`}>Nombre</span>
            <Field
              as={TextField}
              name="nombre"
              fullWidth
              className={`input ${touched.nombre && errors.nombre ? 'error' : ''}`}
              inputProps={{
                ref: nombreInputRef
              }}
            />
            <ErrorMessage className='' name="nombre" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>
          <div style={styles.input}>
            <span className={`placeholder`}>Apellido</span>
            <Field
              as={TextField}
              name="apellido"
              fullWidth
            />
            <ErrorMessage name="apellido" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>
          <div style={styles.input}>
            <span className={`placeholder`}>Fecha de Creación</span>
            <Field
              as={TextField}
              name="fechaCreacion"
              type="date"
              fullWidth
            />
            <ErrorMessage name="fechaCreacion" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>
          <div style={styles.input}>
            <span className={`placeholder`}>Tipo de Permiso</span>
            <FormControl fullWidth>
              <Field
                as={Select}
                name="tipoPermiso"
              >
                <MenuItem value="custom">•••• Nuevo ••••</MenuItem>
                { permissionTypesList.map((row: TypePermissionTypes) => (
                  <MenuItem key={row.id} value={row.descripcion}>{row.descripcion}</MenuItem>
                  )) 
                }
              </Field>
            </FormControl>
            <ErrorMessage name="tipoPermiso" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>
          {values.tipoPermiso === 'custom' && (
            <div style={styles.input}>
              <span className={`placeholder`}>Nuevo tipo de permiso</span>
              <Field
                as={TextField}
                name="tipoPermisoCustom"
                fullWidth
              />
              <ErrorMessage name="tipoPermisoCustom" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
            </div>
          )}
          <Button type="submit" variant="contained" color="primary">
            Crear Permiso
          </Button>
        </Form>
      )}
      </Formik>
    </div>
  )
}
