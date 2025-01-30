import api from '../api'; 
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const ResetPassword = () => {
  const { token } = useParams(); // Récupère le token depuis l'URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      // Remplacez l'URL du backend local par celle de production
      const response = await api.post(`api/users/reset-password`, {
        token,
        password,
      });
  
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login'); // Redirige vers la page de connexion
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Erreur lors de la réinitialisation.");
    }
  };
  return (
    <div>
      <h2>Réinitialisation du Mot de Passe</h2>
      <form onSubmit={handleSubmit}>
        <label>Nouveau mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirmez le mot de passe :</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Réinitialiser</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
