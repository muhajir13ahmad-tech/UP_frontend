import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSiswaList = async () => {
  const response = await api.get('/siswa');
  return response.data;
};

export const getSiswaById = async (id) => {
  const response = await api.get(`/siswa/${id}`);
  return response.data;
};

export const createSiswa = async (data) => {
  const response = await api.post('/siswa', data);
  return response.data;
};

export const updateSiswa = async (id, data) => {
  const response = await api.put(`/siswa/${id}`, data);
  return response.data;
};

export const deleteSiswa = async (id) => {
  const response = await api.delete(`/siswa/${id}`);
  return response.data;
};

export default api;
