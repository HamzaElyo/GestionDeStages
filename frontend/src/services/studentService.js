import api from './api';

export default {
  getStudentApplications: (studentId) => {
    // À remplacer par votre endpoint réel
    return api.get(`/etudiant/${studentId}/applications`);
  },
  createApplication: (applicationData) => {
    return api.post('/etudiant/applications', applicationData);
  },
};