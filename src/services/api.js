import axios from 'axios';

const API_BASE_URL = 'https://localhost:7271/api';

export const fetchPermissions = () => {
  return axios.get(`${API_BASE_URL}/getpermissions`);
};

export const createPermission = (formData) => {
  return axios.post(`${API_BASE_URL}/permissions/request`, formData);
};

export const fetchPermissionTypes = () => {
  return axios.get(`${API_BASE_URL}/permissiontypes`);
};

export const createPermissionType = (formData) => {
  return axios.post(`${API_BASE_URL}/permissiontypes`, formData);
};