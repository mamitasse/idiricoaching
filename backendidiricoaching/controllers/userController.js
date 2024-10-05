const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Contrôleur pour l'inscription des utilisateurs (existant)
exports.registerUser = async (req, res) => {
  const {   firstName,lastName, email, password, gender, age,role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      age,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

// Contrôleur pour la connexion des utilisateurs
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Créer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


    res.json({ token, message: 'Connexion réussie.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};
