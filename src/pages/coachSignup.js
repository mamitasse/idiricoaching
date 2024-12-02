import React, { useState } from 'react';
import './CoachSignup.css'; // Importer le fichier CSS

const CoachSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les emails et les mots de passe correspondent
    if (formData.email !== formData.confirmEmail) {
      return alert("Les emails ne correspondent pas !");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Les mots de passe ne correspondent pas !");
    }

    try {
      const response = await fetch('http://localhost:5000/api/coach-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Inscription réussie !');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="coach-signup-container">
      <h2>Inscription Coach</h2>
      <form onSubmit={handleSubmit} className="coach-signup-form">
        <div className="form-group">
          <label>Prénom</label>
          <input type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Confirmez l'Email</label>
          <input type="email" name="confirmEmail" placeholder="Confirmez l'Email" value={formData.confirmEmail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Confirmez le Mot de passe</label>
          <input type="password" name="confirmPassword" placeholder="Confirmez le Mot de passe" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Sélectionnez un genre</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
        </div>
        <div className="form-group">
          <label>Âge</label>
          <input type="number" name="age" placeholder="Âge" value={formData.age} onChange={handleChange} required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default CoachSignup;
