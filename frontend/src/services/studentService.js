import api from './api';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getStudentApplications: (studentId) => {
    return api.get(`/etudiants/${studentId}/candidatures`)
      .then(res => res.data);
  },

  createApplication: (applicationData) => {
    console.log(applicationData);
    return api.post('/candidatures', applicationData)
      .then(res => res.data);
    
  },
};
