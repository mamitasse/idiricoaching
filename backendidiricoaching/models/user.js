const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['adherent', 'coach'], required: true }, // Rôle de l'utilisateur
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  experience: { type: String }, // Champ ajouté pour les coachs
});

const User = mongoose.model('User', userSchema);
module.exports = User;

