const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sgMail = require('@sendgrid/mail'); // Importer SendGrid
const userRoutes = require('./routes/userRoutes'); // Les routes utilisateur
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

// Routes protégées
app.get('/api/coach-only', authMiddleware, roleMiddleware(['coach']), (req, res) => {
  res.send('Bienvenue Coach !');
});

app.get('/api/adherent-only', authMiddleware, roleMiddleware(['adherent']), (req, res) => {
  res.send('Bienvenue Adhérent !');
});

// Route pour envoyer un email
app.post('/api/send-email', async (req, res) => {
  const { name, email, message, recipient } = req.body;

  // Vérification des données requises
  if (!name || !email || !message || !recipient) {
    return res.status(400).send("Tous les champs sont requis.");
  }

  // Définir l'email du destinataire en fonction du choix (Nadia ou Sabrina)
  const recipientEmail = recipient === 'nadia' ? process.env.NADIA_EMAIL : process.env.SABRINA_EMAIL;

  // Configurer SendGrid avec ta clé API
  sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Utiliser la clé API SendGrid

  const msg = {
    to: recipientEmail, // Email de Nadia ou Sabrina
    from: email, // L'email de l'utilisateur qui a rempli le formulaire
    subject: `Message de ${name}`, // Objet du message
    text: message, // Corps du message
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Email envoyé avec succès à ' + recipient);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).send("Erreur lors de l'envoi de l'email");
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
