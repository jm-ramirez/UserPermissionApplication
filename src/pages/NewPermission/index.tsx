import React, { useEffect, useRef, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  FormControl,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import { TypePermissionTypes } from '../../model/types';
import { getPermissionTypes, getPermissionsById, modifyPermissions, requestPermissions } from '../../services/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const styles = {
  input: { marginBottom: '10px' }
}

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  fechaCreacion: Yup.date().required('La fecha de creación es obligatoria'),
  tipoPermiso: Yup.string().required('El tipo de permiso es obligatorio'),
  tipoPermisoCustom: Yup.string().test('tipoPermisoCustom', 'Campo requerido', function (value) {
    if (this.parent.tipoPermiso === 'custom') {
      return !!value;
    }
    return true;
  }),
});

export const NewPermission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [permissionTypesList, setPermissionTypesList] = useState<TypePermissionTypes[]>([]);
  const nombreInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    apellido: '',
    fechaCreacion: new Date().toISOString().substring(0, 10),
    tipoPermiso: '',
    tipoPermisoCustom: '',
  });

  const handleSubmit = async (values: any) => {    
    try {
      const selectedTipoPermiso = values.tipoPermiso === "custom" ? values.tipoPermisoCustom : values.tipoPermiso;

      const response = id ?      
        await modifyPermissions({
          id: Number(id),
          nombreEmpleado: values.nombre,
          apellidoEmpleado: values.apellido,
          fechaPermiso: values.fechaCreacion.substring(0, 10) ?? new Date().toISOString().substring(0, 10),
          tipoPermisoNombre: selectedTipoPermiso
        })
      :
        await requestPermissions({
          nombreEmpleado: values.nombre,
          apellidoEmpleado: values.apellido,
          fechaPermiso: values.fechaCreacion.substring(0, 10) ?? new Date().toISOString().substring(0, 10),
          tipoPermisoNombre: selectedTipoPermiso
        });

        

      if (response) {
        toast.success(`El permiso se ${id ? 'actualizó' : 'agregó' } exitosamente`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Cierra el toast automáticamente después de 3 segundos
          onClose: () => {
            navigate('/');
          },
        });   
      } else {
        toast.error(`Hubo un error al ${id ? 'actualizar' : 'agregar' } el permiso.`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Cierra el toast automáticamente después de 3 segundos
        });     
      }
    } catch (error) {
      toast.error(`Hubo un error al ${id ? 'actualizar' : 'agregar' } el permiso.`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Cierra el toast automáticamente después de 3 segundos
      });  
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPermissionTypes()
      .then((data) => {
        setPermissionTypesList(data);
      })
      .catch(() => {
        setPermissionTypesList([]);
      });

    if (id) {
      getPermissionsById(Number(id))
      .then((data) => {
        if(data === null){
          toast.error('Hubo un error al recuperar los datos del permiso.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Cierra el toast automáticamente después de 3 segundos
            onClose: () => {
              navigate('/');
            },
          });
        } else {
          const permissionToEdit = {
            nombre: data?.nombreEmpleado??'',
            apellido: data?.apellidoEmpleado??'',
            fechaCreacion: data?.fechaPermiso.toString().substring(0, 10)??new Date().toISOString().substring(0, 10),
            tipoPermiso: data?.permissionTypes?.descripcion??'',
            tipoPermisoCustom: ''
          }
          setInitialValues(permissionToEdit);
        }
      })
      .catch(() => {
        toast.error('Hubo un error al recuperar los datos del permiso.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Cierra el toast automáticamente después de 3 segundos
          onClose: () => {
            navigate('/');
          },
        }); 
      })
      .finally(() => setIsLoading(false));
    } else { setIsLoading(false) };
  }, []);

  useEffect(() => {
    if(!isLoading && nombreInputRef.current)
      nombreInputRef.current.focus();
  }, [isLoading]);  
  
  return (
    isLoading ?
      <CircularProgress/>
    : <div>
      <Typography variant="h4" gutterBottom>
        Nuevo Permiso
      </Typography>
      <Button 
        variant="contained"
        color="primary"
        href="/" 
        style={{marginBottom: 8}}
      >
        Volver
      </Button>
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
          <Button 
            type="submit" 
            variant="contained" 
            color="success"
          >
            Guardar
          </Button>
        </Form>
      )}
      </Formik>
    </div>
  )
}
