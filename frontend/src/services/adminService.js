import api from './api';

export default {
  getStats: () => {
    return api.get('/admin/stats');
  },
  getAllUsers: () => {
    return api.get('/admin/users');
  },
  getRecentUsers: () => {
    return api.get('/admin/users/recent');
  },
  updateUserStatus: (userId, isActive) => {
    return api.put(`/admin/users/${userId}/status`, { active: isActive });
  },
  getDetailedStats: () => {
    return api.get('/admin/stats/detailed');
  },
  // Optionnel: affectation d'étudiants à des entreprises
  assignStudentToCompany: (studentId, companyId) => {
    return api.post('/admin/assign', { studentId, companyId });
  },
};