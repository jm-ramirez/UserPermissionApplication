import axios from 'axios';
import { 
  ModifyPermissionParams, 
  RequestPermissionParams, 
  TypePermissionTypes, 
  TypePermissions 
} from '../model/types';

const API_BASE_URL = 'https://localhost:7271/api/';

export const requestPermissions = async (formData: RequestPermissionParams) => {
  try {
    await axios.post(`${API_BASE_URL}permissions/request`, formData);
    return true;
  } catch (error) {
    return false;
  }
};

export const modifyPermissions = async (formData: ModifyPermissionParams) => {
  try {
    return await axios.post(`${API_BASE_URL}permissions/modify`, formData);
  } catch (error) {
    throw error; 
  }
};

export const getPermissions = async (): Promise<TypePermissions[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}permissions/`);
    const data = response.data; // La respuesta del servicio en formato JSON
    return data;
  } catch (error) {
    return [];
  }
};

export const getPermissionsById = async (permissionId: number): Promise<TypePermissions | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}permissions/${permissionId}`);
    const data = response.data; // La respuesta del servicio en formato JSON
    return data;
  } catch (error) {
    return null;
  }
};

export const getPermissionTypes = async (): Promise<TypePermissionTypes[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}permissiontypes/`);
    const data = response.data; // La respuesta del servicio en formato JSON
    return data;
  } catch (error) {
    return [];
  }
};