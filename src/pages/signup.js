import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css'; // Assurez-vous que ce chemin est correct pour votre CSS

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('adherent');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [selectedCoach, setSelectedCoach] = useState('');
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coaches');
        setCoaches(response.data); // Assurez-vous que cela correspond au format de votre réponse
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    };
    fetchCoaches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if (email !== confirmEmail) {
      alert("Les emails ne correspondent pas.");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
      gender,
      age: parseInt(age, 10),
      coachId: role === 'adherent' ? selectedCoach : undefined,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/adherent-register', userData);
      alert('Utilisateur enregistré avec succès');
    } catch (error) {
      console.error('Error registering user:', error);
      alert(`Erreur: ${error.response.data.error}`);
    }
  };

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Prénom:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Nom:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Confirmez l'Email:</label>
          <input type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Confirmez le Mot de passe:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Rôle:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="adherent">Adhérent</option>
            <option value="coach">Coach</option>
          </select>
        </div>
        {role === 'adherent' && (
          <div className="form-group">
            <label>Choisissez un Coach:</label>
            <select value={selectedCoach} onChange={(e) => setSelectedCoach(e.target.value)} required>
              <option value="">Sélectionnez un coach</option>
              {coaches.map(coach => (
                <option key={coach._id} value={coach._id}>{coach.firstName} {coach.lastName}</option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Genre:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Sélectionnez un genre</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
        </div>
        <div className="form-group">
          <label>Âge:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
