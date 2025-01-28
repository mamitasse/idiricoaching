import axios from 'axios';

// Crée une instance axios avec une URL de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL de base provenant de l'environnement
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
