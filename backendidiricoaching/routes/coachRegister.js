const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Supposons que le modèle User gère à la fois les coachs et les adhérents

const router = express.Router();

// Route pour obtenir tous les coachs
router.get('/coaches', async (req, res) => {
    try {
      const coaches = await User.find({ role: 'coach' });
      res.json(coaches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des coachs.' });
    }
  });
  


// Route d'inscription des coachs
router.post('/coach-register', async (req, res) => {
  const { firstName, lastName, email, password, gender, age } = req.body; // Ajoutez les champs spécifiques aux coachs

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur coach
    const newCoach = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'coach', // Rôle spécifié en tant que coach
      gender,
      age
    });

    await newCoach.save();
    res.status(201).json({ message: 'Inscription du coach réussie !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'inscription du coach." });
  }
});

module.exports = router;
