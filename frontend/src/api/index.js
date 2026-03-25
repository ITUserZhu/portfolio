import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('API Error:', err.message);
    return Promise.reject(err);
  }
);

export const getProfile = () => api.get('/profile');
export const getSkills = () => api.get('/skills');
export const getProjects = (featured) =>
  api.get('/projects', { params: { featured } });
export const submitContact = (data) => api.post('/contact', data);

// 词汇 API
export const getVocabulary = (params) => api.get('/vocabulary', { params });
export const getVocabularyById = (id) => api.get(`/vocabulary/${id}`);
export const addVocabulary = (data) => api.post('/vocabulary', data);
export const updateVocabulary = (id, data) => api.put(`/vocabulary/${id}`, data);
export const deleteVocabulary = (id) => api.delete(`/vocabulary/${id}`);
export const toggleFavorite = (id) => api.patch(`/vocabulary/${id}/favorite`);
export const toggleMastered = (id) => api.patch(`/vocabulary/${id}/mastered`);
export const getVocabularyStats = () => api.get('/vocabulary-stats');
export const getRandomBatch = (params) => api.get('/vocabulary/random-batch', { params });

export default api;
