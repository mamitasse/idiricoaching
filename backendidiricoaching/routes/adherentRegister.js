const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Modèle pour les utilisateurs

const router = express.Router();

// Route d'inscription des adhérents
router.post('/adherent-register', async (req, res) => {
  const { firstName, lastName, email, password, gender, age, coachId } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Validation pour le rôle 'Adhérent'
    if (!coachId) {
      return res.status(400).json({ error: 'La sélection d\'un coach est requise pour le rôle d\'adhérent.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur adhérent
    const newAdherent = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'adherent', // Rôle spécifié en tant qu'adhérent
      gender,
      age,
      coachId // Ajoutez le coach ID ici
    });

    await newAdherent.save();
    res.status(201).json({ message: 'Inscription de l\'adhérent réussie !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'inscription de l'adhérent." });
  }
});

module.exports = router;
