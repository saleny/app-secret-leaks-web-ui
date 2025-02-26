import api from './api';

export const createProject = async (repoUrl) => {
  const response = await api.post('/projects/', { repo_url: repoUrl });
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get('/projects/');
  return response.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

export const getProjectScans = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/scans`);
  return response.data;
};