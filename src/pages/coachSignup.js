import React, { useState } from 'react';
import './CoachSignup.css'; // Importer le fichier CSS

const CoachSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    age: '',
 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="Prénom" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Nom" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
      <input type="text" name="gender" placeholder="Genre" onChange={handleChange} />
      <input type="number" name="age" placeholder="Âge" onChange={handleChange} />
     
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default CoachSignup;
