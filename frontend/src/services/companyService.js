import api from './api';

export default {
  getCompanyApplications: (companyId) => {
    // À remplacer par votre endpoint réel
    return api.get(`/entreprise/${companyId}/applications`);
  },
  updateApplicationStatus: (applicationId, status, comment) => {
    return api.put(`/entreprise/applications/${applicationId}`, { status, comment });
  },
  getApplicationDetails: (applicationId) => {
    return api.get(`/entreprise/applications/${applicationId}`);
  },
};