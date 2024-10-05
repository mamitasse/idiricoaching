import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assure-toi que ce fichier existe pour styliser le formulaire.

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    submissionError: false,
    errorMessage: '',
  });

  const navigate = useNavigate();

  // Gère les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// Fonction pour gérer la soumission du formulaire
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    // Vérifie si la réponse est OK avant de traiter le corps
    if (!response.ok) {
      const errorData = await response.json(); // Récupère le corps de la réponse si pas OK
      setErrors({ ...errors, submissionError: true, errorMessage: errorData.error || 'Une erreur est survenue' });
      return; // Sort de la fonction pour éviter de continuer
    }

    const data = await response.json(); // Récupère le corps de la réponse

    console.log(data); // Affiche la réponse pour vérifier

    // Vérifie si les données contiennent un token et un rôle
    if (data.token && data.user) {
      localStorage.setItem('token', data.token); // Stocke le token dans localStorage (ou un autre endroit de votre choix)
      const userRole = data.user.role; // Récupère le rôle de l'utilisateur (coach ou adhérent)

      // Redirige en fonction du rôle de l'utilisateur
      if (userRole === 'coach') {
        navigate('/coach-dashboard'); // Redirection vers le tableau de bord du coach
      } else if (userRole === 'adherent') {
        navigate('/adherent-dashboard'); // Redirection vers le tableau de bord de l'adhérent
      }
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    setErrors({ ...errors, submissionError: true, errorMessage: 'Une erreur est survenue lors de la connexion' });
  }
};



  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">Se connecter</button>
      </form>

      {errors.submissionError && <p className="error">{errors.errorMessage}</p>}
    </div>
  );
};

export default Login;
