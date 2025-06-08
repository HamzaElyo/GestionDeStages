// services/stageService.js
import api from './api';

// eslint-disable-next-line import/no-anonymous-default-export
const getAll = () => api.get('/stages');

const getStagesByEntreprise = (entrepriseId) => {
  return api.get(`/stages/${entrepriseId}`);
};

const createStage = (stageData) => {
  const payload = {
    ...stageData,
    tuteurId: stageData.tuteurId === '' ? null : stageData.tuteurId,
  };
  return api.post('/stages', payload);
};

const updateStage = (stageId, stageData) => {
  const payload = {
    ...stageData,
    tuteurId: stageData.tuteurId === '' ? null : stageData.tuteurId,
  };
  console.log(stageData);
  return api.put(`/stages/${stageId}`, payload);
};

const getTuteursByEntreprise = (entrepriseId) => {
  return api.get(`/tuteurs/entreprise/${entrepriseId}`); // endpoint à adapter selon backend
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTuteursByEntreprise,
  getStagesByEntreprise,
  createStage,
  updateStage,
  getAll
};
