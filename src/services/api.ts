import axios from 'axios';
import { ModifyPermissionParams, RequestPermissionParams, TypePermissions } from '../model/types';

const API_BASE_URL = 'https://localhost:7271/api/permissions/';

export const requestPermissions = (formData: RequestPermissionParams) => {
  return axios.post(`${API_BASE_URL}request`, formData);
};

export const modifyPermissions = (formData: ModifyPermissionParams) => {
  return axios.post(`${API_BASE_URL}modify`, formData);
};

// export const getPermissions = (): Promise<TypePermissions[]> => {
//   return axios.get(`${API_BASE_URL}get`);
// };

export const getPermissions = (): Promise<TypePermissions[]> => {
  return axios.get(`${API_BASE_URL}get`)
    .then((response) => {
      const data = response.data; // La respuesta del servicio en formato JSON
      return data;
    })
    .catch((error) => {
      console.error('Error al obtener permisos:', error);
      throw error; // O maneja el error según tus necesidades
    });
};

export const getPermissionsById = (permissionId: number) => {
  return axios.get(`${API_BASE_URL}get/${permissionId}`);
};