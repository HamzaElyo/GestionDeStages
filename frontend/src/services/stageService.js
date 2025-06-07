// services/stageService.js
import api from './api';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: () => api.get('/stages'),
};
