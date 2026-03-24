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

export default api;
