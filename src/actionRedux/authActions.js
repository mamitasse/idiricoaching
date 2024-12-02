//actionRedux/authAction.js
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FETCH_COACH_INFO_SUCCESS,
  FETCH_ERROR,
  FETCH_AVAILABLE_SLOTS_SUCCESS,
  LOGOUT,
} from './actionsType'; // Correction du chemin

const API_URL = 'http://localhost:5000/api'; // Remplacez par l'URL de votre API déployée, si nécessaire

// Action pour se connecter
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la connexion');
    }

    localStorage.setItem('token', data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.error('Erreur dans login:', error);
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

// Action pour se déconnecter
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

// Action pour récupérer les informations du coach
export const fetchCoachInfo = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token manquant.');

    const response = await fetch(`${API_URL}/coaches/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations du coach');
    }

    dispatch({ type: FETCH_COACH_INFO_SUCCESS, payload: data });
  } catch (error) {
    console.error('Erreur dans fetchCoachInfo:', error);
    dispatch({ type: FETCH_ERROR, payload: error.message });
  }
};

// Action pour récupérer les créneaux disponibles
export const fetchAvailableSlots = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token manquant.');

    const response = await fetch(`${API_URL}/coaches/available-slots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des créneaux disponibles');
    }

    dispatch({ type: FETCH_AVAILABLE_SLOTS_SUCCESS, payload: Array.isArray(data) ? data : [] }); // Vérifie si c'est un tableau
  } catch (error) {
    console.error('Erreur dans fetchAvailableSlots:', error);
    dispatch({ type: FETCH_ERROR, payload: error.message });
  }
};

