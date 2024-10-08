const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Routes pour les utilisateurs
const adherentRoutes = require('./routes/adherentRegister'); // Vérifiez le chemin d'accès
const emailRoutes = require('./routes/emailRoutes'); // Routes pour l'envoi d'emails
const coachRoutes = require('./routes/coachRegister'); // Routes pour l'inscription des coachs
const { authMiddleware, roleMiddleware } = require('./middleware/authMiddleware'); // Middleware pour authentification et rôle
require('dotenv').config(); // Pour utiliser les variables d'environnement

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Pour lire le corps des requêtes en JSON
app.use(cors()); // Pour éviter les problèmes de CORS

// Connexion à MongoDB
const uri = process.env.MONGO_URI || "mongodb+srv://mamitasse:Massi0310@idiricoaching.grpny.mongodb.net/idiricoaching?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.error("Erreur lors de la connexion à MongoDB:", err));

// Routes utilisateur
app.use('/api/users', userRoutes);

// Routes email
app.use('/api', emailRoutes);


// Routes pour les coachs
app.use('/api', coachRoutes); // Ajoutez les routes des coachs ici

// Routes pour les adhérents
app.use('/api', adherentRoutes); // Ajoutez les routes des adhérents ici

// Routes protégées
app.get('/api/coach-only', authMiddleware, roleMiddleware(['coach']), (req, res) => {
  res.send('Bienvenue Coach !');
});

app.get('/api/adherent-only', authMiddleware, roleMiddleware(['adherent']), (req, res) => {
  res.send('Bienvenue Adhérent !');
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
