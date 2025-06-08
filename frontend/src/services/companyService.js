import api from './api';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCompanies: () => {
    return api.get('/entreprises'); // <-- Assure-toi que ce endpoint existe côté backend
  },
  getCompanyApplications: (companyId) => {
    return api.get(`/entreprises/${companyId}/applications`);
  },
  updateApplicationStatus: (applicationId, status, comment) => {
  const payload = {};
  
  if (status !== undefined && status !== null) {
    payload.status = status;
  }

  if (comment !== undefined && comment !== null && comment.trim() !== '') {
    payload.comment = comment;
  }

  return api.put(`/entreprises/applications/${applicationId}`, payload);
},
  getApplicationDetails: (applicationId) => {
    return api.get(`/entreprises/applications/${applicationId}`);
  },
};
