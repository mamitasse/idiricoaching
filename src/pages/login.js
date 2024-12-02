import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le formulaire.

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

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Vérifiez si la réponse est OK
      if (!response.ok) {
        const errorData = await response.json(); // Récupère les erreurs du backend
        setErrors({
          submissionError: true,
          errorMessage: errorData.error || 'Une erreur est survenue.',
        });
        return;
      }

      const data = await response.json(); // Récupère les données de l'utilisateur

      console.log('Connexion réussie :', data); // Debug

      // Stockez le token et les informations utilisateur dans `localStorage`
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id); // Utiliser _id si c'est le champ correct
      localStorage.setItem('coachName', `${data.user.firstName} ${data.user.lastName}`);
      localStorage.setItem('role', data.user.role);

      // Vérifiez et affichez le rôle pour déboguer
      console.log('Rôle de l’utilisateur :', data.user.role);

      // Redirection basée sur le rôle de l'utilisateur
      if (data.user.role === 'coach') {
        navigate('/coach-dashboard'); // Redirige vers le tableau de bord du coach
      } else if (data.user.role === 'adherent') {
        navigate('/adherent-dashboard'); // Redirige vers le tableau de bord de l'adhérent
      } else {
        setErrors({
          submissionError: true,
          errorMessage: 'Rôle utilisateur inconnu. Veuillez contacter un administrateur.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrors({
        submissionError: true,
        errorMessage: 'Une erreur est survenue lors de la connexion. Veuillez réessayer.',
      });
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
