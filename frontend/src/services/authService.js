import api from './api';

export default {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/signup', userData),
  // Pas encore d'endpoint /me dans votre backend
};