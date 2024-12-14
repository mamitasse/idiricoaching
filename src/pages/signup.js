import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Assurez-vous que ce chemin est correct pour votre CSS

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [selectedCoach, setSelectedCoach] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validateForm = () => {
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = 'Le prénom est obligatoire.';
    }

    if (!lastName) {
      newErrors.lastName = 'Le nom est obligatoire.';
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "L'email est invalide.";
    }

    if (email !== confirmEmail) {
      newErrors.confirmEmail = "Les emails ne correspondent pas.";
    }

    if (!phoneRegex.test(phone)) {
      newErrors.phone = "Le numéro de téléphone est invalide. Veuillez entrer 10 chiffres.";
    }

    if (address.trim().length < 5) {
      newErrors.address = "L'adresse doit contenir au moins 5 caractères.";
    }

    if (age < 18) {
      newErrors.age = "Vous devez avoir au moins 18 ans pour vous inscrire.";
    }

    if (!selectedCoach) {
      newErrors.selectedCoach = "Vous devez sélectionner un coach.";
    }

    if (!gender) {
      newErrors.gender = "Le genre est obligatoire.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const coachMapping = {
      nadia: '6753827c3be821de23db3033',
      sabrina: '675454d9545f71e6271d40df',
    };

    const userData = {
      firstName,
      lastName,
      email,
      password,
      role: 'adherent',
      gender,
      age: parseInt(age, 10),
      coachId: coachMapping[selectedCoach],
      phone,
      address,
    };

    try {
      await axios.post('http://localhost:5000/api/users/adherent-register', userData);
      setSuccessMessage('Inscription réussie ! Redirection vers la page de connexion...');
      setErrors({});
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrors({ global: error.response?.data?.error || 'Erreur inattendue.' });
    }
  };

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errors.global && <div className="error-message">{errors.global}</div>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Prénom:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Confirmez l'Email:</label>
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
          {errors.confirmEmail && <span className="error-text">{errors.confirmEmail}</span>}
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmez le Mot de passe:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Sélectionnez un genre</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
          {errors.gender && <span className="error-text">{errors.gender}</span>}
        </div>
        <div className="form-group">
          <label>Choisissez un Coach:</label>
          <select
            value={selectedCoach}
            onChange={(e) => setSelectedCoach(e.target.value)}
            required
          >
            <option value="">Sélectionnez un coach</option>
            <option value="nadia">Nadia</option>
            <option value="sabrina">Sabrina</option>
          </select>
          {errors.selectedCoach && <span className="error-text">{errors.selectedCoach}</span>}
        </div>
        <div className="form-group">
          <label>Téléphone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Adresse:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label>Âge:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
