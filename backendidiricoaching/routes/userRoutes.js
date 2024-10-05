const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assurez-vous que le chemin vers votre modèle est correct
const router = express.Router();

// Obtenir la clé secrète JWT, ou définir une valeur par défaut si elle n'existe pas
const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

// Route d'inscription
router.post('/register', async (req, res) => {
  console.log('register route');
  console.log(req.body);
  const { firstName, lastName, email, password, gender, age, role } = req.body;

  // Validation simple pour les champs
  if (!email || !password || !firstName || !lastName || !gender || !age || !role) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      age,
      role,  // Enregistrement du rôle
    });

    // Sauvegarde de l'utilisateur dans MongoDB
    const savedUser = await newUser.save();

    // Création du token JWT avec une clé secrète sécurisée
    const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, jwtSecret, { expiresIn: '1h' });

    // Réponse au client avec le token et les détails de l'utilisateur
    res.status(201).json({
      message: 'Utilisateur enregistré avec succès',
      token,
      user: { id: savedUser._id, firstName: savedUser.firstName, email: savedUser.email, role: savedUser.role },
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  console.log('login route');
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis' });
  }

  try {
    // Vérification si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Création d'un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });

    // Réponse avec le token et les informations de l'utilisateur
    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;
