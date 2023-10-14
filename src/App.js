import React from 'react';
import { Container, CssBaseline, Typography, Paper, Grid } from '@mui/material';
import PermissionForm from './components/PermissionForm';
import PermissionTypeForm from './components/PermissionTypeForm';

function App() {
  return (
    <Container>
      <CssBaseline />
      <Typography variant="h3" gutterBottom>
        Permisos de usuarios
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Formulario de Permiso
            </Typography>
            <PermissionForm />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Formulario de Tipo de Permiso
            </Typography>
            <PermissionTypeForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;