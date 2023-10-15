import React from 'react'
import { Typography, Grid, Button } from '@mui/material';
import { PermissionTable } from '../../components/PermissionTable';

export const Home = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h4" gutterBottom>Permisos de usuarios</Typography>
          <Button href="/new-permission" style={{marginBottom: 8}}>Crear nuevo permiso</Button>
          <PermissionTable/>
        </Grid>
      </Grid>
    </div>
  )
}
