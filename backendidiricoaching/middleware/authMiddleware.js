const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assurez-vous du chemin correct vers le modèle User


/**
 * Middleware d'authentification pour vérifier le token JWT.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie la présence du header Authorization
  if (!authHeader) {
    console.error('Erreur : Header d’autorisation manquant.');
    return res.status(401).json({ message: 'Authorization header manquant.' });
  }

  // Extrait le token du header Authorization
  const token = authHeader.split(' ')[1]; // Format attendu : "Bearer <token>"
  if (!token) {
    console.error('Erreur : Token manquant dans le header d’autorisation.');
    return res.status(401).json({ message: 'Token manquant.' });
  }

  try {
    // Vérification et décodage du token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token décodé avec succès :', decoded); // Ajout pour débogage
    req.user = decoded; // Ajoute les données du token (userId, role, etc.) à req.user
    next(); // Passe au middleware ou au contrôleur suivant
  } catch (error) {
    console.error('Erreur lors de la vérification du token JWT :', error.message);
    return res.status(401).json({ message: `Token invalide : ${error.message}` });
  }
};

/**
 * Middleware de gestion des rôles pour restreindre l'accès.
 * @param {Array<string>} roles - Liste des rôles autorisés.
 */
const roleMiddleware = (roles) => (req, res, next) => {
  try {
    // Vérifie si les informations utilisateur sont présentes
    if (!req.user) {
      console.warn('Erreur : Informations utilisateur manquantes dans la requête.');
      return res.status(401).json({ error: 'Utilisateur non authentifié.' });
    }

    // Vérifie si l'utilisateur a un rôle autorisé
    if (!roles.includes(req.user.role)) {
      console.warn(
        `Erreur : Accès interdit pour le rôle '${req.user.role}'. Rôles autorisés : ${roles.join(', ')}`
      );
      return res.status(403).json({ error: `Accès interdit pour le rôle '${req.user.role}'.` });
    }

    console.log(`Accès autorisé pour le rôle '${req.user.role}'.`); // Ajout pour débogage
    next(); // Passe au middleware ou au contrôleur suivant
  } catch (error) {
    console.error('Erreur dans le middleware de rôle :', error.message);
    res.status(500).json({ error: 'Erreur serveur dans le middleware de rôle.' });
  }
};

module.exports = { authMiddleware, roleMiddleware };
