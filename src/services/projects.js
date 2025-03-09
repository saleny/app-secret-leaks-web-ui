import api from './api';

export const createProject = async (repoUrl) => {
  const response = await api.post('/projects/', { repo_url: repoUrl });
  return response.data;
};

export const getProjects = async (isAdmin) => {
  try {
    const endpoint = isAdmin ? '/projects/all' : '/projects';
    const response = await api.get(endpoint);
    return {
      data: Array.isArray(response.data)
        ? response.data
        : [] // Гарантируем массив
    };
  } catch (error) {
    console.error('Ошибка получения проектов:', error);
    return { data: [] }; // Возвращаем пустой массив при ошибке
  }
};

export const getProject = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const getProjectScans = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/scans`);
  return response.data;
};

export const deleteProject = async (projectId) => {
  try {
    await api.delete(`/projects/${projectId}`);
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};