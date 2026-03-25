import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器：自动附加 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：处理 401 自动跳转登录
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    // 只有在已登录状态下遇到 401 才跳转登录页
    const token = localStorage.getItem('auth_token');
    if (err.response?.status === 401 && token) {
      localStorage.removeItem('auth_token');
      // 避免在登录页重复跳转
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export const getProfile = () => api.get('/profile');
export const getSkills = () => api.get('/skills');
export const getProjects = (featured) =>
  api.get('/projects', { params: { featured } });
export const submitContact = (data) => api.post('/contact', data);

// 认证 API
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');

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
