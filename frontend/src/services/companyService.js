import api from './api';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCompanies: () => {
    return api.get('/entreprises'); // <-- Assure-toi que ce endpoint existe côté backend
  },
  getCompanyApplications: (companyId) => {
    return api.get(`/entreprise/${companyId}/applications`);
  },
  updateApplicationStatus: (applicationId, status, comment) => {
    return api.put(`/entreprise/applications/${applicationId}`, { status, comment });
  },
  getApplicationDetails: (applicationId) => {
    return api.get(`/entreprise/applications/${applicationId}`);
  },
};
