import axios from 'axios';

// Définir l'URL de l'API
const API_URL = process.env.REACT_APP_API_URL || 'https://api-idiricoaching.fr';

// Créer une instance Axios avec la configuration par défaut
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
