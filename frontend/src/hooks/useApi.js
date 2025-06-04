import { useState } from 'react';
import api from '../services/api';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await api.get(url);
          break;
        case 'post':
          response = await api.post(url, data);
          break;
        case 'put':
          response = await api.put(url, data);
          break;
        case 'delete':
          response = await api.delete(url);
          break;
        default:
          throw new Error(`Méthode HTTP non supportée: ${method}`);
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    get: (url) => callApi('get', url),
    post: (url, data) => callApi('post', url, data),
    put: (url, data) => callApi('put', url, data),
    delete: (url) => callApi('delete', url),
    loading,
    error,
  };
}