import api from './api';

export const registerUser = async (userData) => {
  const response = await api.post('/users/', userData);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};