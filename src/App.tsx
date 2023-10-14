import React from 'react';
import { Container, CssBaseline, Typography, Grid } from '@mui/material';
import { PermissionTable } from './components/PermissionTable';

function App() {
  return (
    <Container>
      <CssBaseline />
      <Typography variant="h3" gutterBottom>
        Permisos de usuarios
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <PermissionTable/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;