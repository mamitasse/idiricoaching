const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ['coach', 'adherent'],  // Limite le rôle à coach ou adhérent
  },
  gender: {
    type: String,
    enum: ['homme', 'femme'], // Pour plus de flexibilité
  },
  age: {
    type: Number,
    min: 0, // Limite l'âge à des valeurs positives
  },
});


const User = mongoose.model('User', userSchema);
module.exports = User;
