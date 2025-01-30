import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errors, setErrors] = useState({
    submissionError: false,
    errorMessage: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  // Gérer les changements dans le formulaire principal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer les changements pour la partie "Mot de passe oublié"
  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  // Soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({
          submissionError: true,
          errorMessage: errorData.error || 'Email ou mot de passe incorrect.',
        });
        return;
      }

      const data = await response.json();
      console.log('Connexion réussie :', data);

      // Stocker les informations utilisateur
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('coachName', `${data.user.firstName} ${data.user.lastName}`);
      localStorage.setItem('role', data.user.role);

      // Redirection basée sur le rôle
      if (data.user.role === 'coach') {
        navigate(`/coach-dashboard`);
      } else if (data.user.role === 'adherent') {
        navigate(`/adherent-dashboard`);
      } else {
        setErrors({
          submissionError: true,
          errorMessage: 'Rôle utilisateur inconnu.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrors({
        submissionError: true,
        errorMessage: 'Erreur lors de la connexion. Veuillez réessayer.',
      });
    }
  };

  // Soumission pour le mot de passe oublié
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      if (response.ok) {
        setSuccessMessage('Un lien de réinitialisation a été envoyé à votre email.');
        setErrors({ submissionError: false, errorMessage: '' });
      } else {
        const errorData = await response.json();
        setErrors({
          submissionError: true,
          errorMessage: errorData.error || 'Erreur lors de la demande de réinitialisation.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la réinitialisation :', error);
      setErrors({
        submissionError: true,
        errorMessage: 'Erreur serveur. Veuillez réessayer.',
      });
    }
  };

  return (
    <div className="login-container">
      {!showForgotPassword ? (
        // Formulaire de connexion
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Connexion</h2>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Se connecter</button>
          <p onClick={() => setShowForgotPassword(true)} className="forgot-password">
            Mot de passe oublié ?
          </p>
          {errors.submissionError && <p className="error">{errors.errorMessage}</p>}
        </form>
      ) : (
        // Formulaire pour le mot de passe oublié
        <form onSubmit={handleForgotPasswordSubmit} className="forgot-password-form">
          <h2>Mot de passe oublié</h2>
          <div className="form-group">
            <label>Entrez votre email :</label>
            <input
              type="email"
              value={forgotPasswordEmail}
              onChange={handleForgotPasswordChange}
              required
            />
          </div>
          <button type="submit" className="reset-button">Envoyer</button>
          <p onClick={() => setShowForgotPassword(false)} className="back-to-login">
            Retour à la connexion
          </p>
          {errors.submissionError && <p className="error">{errors.errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;