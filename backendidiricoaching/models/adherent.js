const mongoose = require('mongoose');

// Définition du schéma pour les adhérents
const adherentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Veuillez entrer une adresse e-mail valide'],
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['homme', 'femme'], // Pour plus de flexibilité
    required: true,
  },
  // Ajoute d'autres champs nécessaires ici, comme l'adresse, etc.
});

// Création du modèle pour le schéma
const Adherent = mongoose.model('Adherent', adherentSchema);

// Exportation du modèle
module.exports = Adherent;
