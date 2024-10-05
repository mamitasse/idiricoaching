const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Récupérer l'en-tête Authorization
  const authHeader = req.header('Authorization');

  // Vérifier si l'en-tête est présent
  if (!authHeader) {
    return res.status(401).json({ message: 'Accès non autorisé : pas de token' });
  }

  // Remplacer 'Bearer ' dans l'en-tête pour obtenir le token
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé : token manquant' });
  }

  try {
    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attacher les infos de l'utilisateur décodé à la requête
    next();  // Passer au middleware ou au contrôleur suivant
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Vérifier si l'utilisateur a un rôle autorisé
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };
