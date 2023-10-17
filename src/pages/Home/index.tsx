import React from 'react'
import { Typography, Grid, Button } from '@mui/material';
import { PermissionTable } from '../../components/PermissionTable';

export const Home = () => {
  return (
    <div style={{marginTop: 12}}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            Permisos de usuarios
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            href="/new-permission"
            style={{ marginBottom: 8 }}
          >
            Crear nuevo permiso
          </Button>
        </Grid>
      </Grid>
      <PermissionTable />
    </div>
  )
}
