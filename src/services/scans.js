import api from './api';

export const getScans = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/scans`);
  return response.data;
};

export const getScanDetails = async (scanId) => {
  const response = await api.get(`/scans/${scanId}`);
  return response.data;
};