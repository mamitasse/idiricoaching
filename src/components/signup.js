import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    role: '', // coach ou adherent
    gender: '',
    age: '',
  });

  const [errors, setErrors] = useState({
    emailMatch: false,
    passwordMatch: false,
    submissionError: false,
    successMessage: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('coucou');
  
    // Validation des emails et des mots de passe
    if (formData.email !== formData.confirmEmail) {
      setErrors({ ...errors, emailMatch: true });
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMatch: true });
      return;
    }
  
    setErrors({ emailMatch: false, passwordMatch: false, submissionError: false, successMessage: '' });
  
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
  
        

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          gender: formData.gender,
          age: formData.age,
        }),
      
  
      });
  
      console.log(response);
  
      // Vérification du contenu de la réponse avant de la convertir en JSON
      if (response.ok) {
        const data = await response.json(); // Assure-toi que la réponse est bien du JSON
        setErrors({ ...errors, successMessage: 'Inscription réussie !' });
  
        // Redirige l'utilisateur vers la page de connexion
        navigate('/login');
      } else {
        const errorData = await response.text(); // Utilise text() pour lire le corps de la réponse même si ce n'est pas du JSON
        console.error('Erreur lors de l\'inscription:', errorData);
        setErrors({ ...errors, submissionError: true });
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrors({ ...errors, submissionError: true });
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} className="signup-form">

        <div className="form-group">
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

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
          <label htmlFor="confirmEmail">Confirmer l'email :</label>
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
            required
          />
          {errors.emailMatch && (
            <span className="error">Les emails ne correspondent pas</span>
          )}
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.passwordMatch && (
            <span className="error">Les mots de passe ne correspondent pas</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Rôle :</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez votre rôle</option>
            <option value="coach">Coach</option>
            <option value="adherent">Adhérent</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sexe :</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="homme"
                checked={formData.gender === 'homme'}
                onChange={handleChange}
                required
              />
              Homme
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="femme"
                checked={formData.gender === 'femme'}
                onChange={handleChange}
                required
              />
              Femme
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="age">Âge :</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
          />
        </div>

        <button type="submit" className="signup-button">S'inscrire</button>
      </form>

      {errors.successMessage && <p className="success">{errors.successMessage}</p>}
      {errors.submissionError && <p className="error">Une erreur est survenue lors de l'inscription.</p>}
    </div>
  );
};

export default Signup;
