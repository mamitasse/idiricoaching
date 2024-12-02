//IDIRICOACHING/backendendidiricoaching/models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['adherent', 'coach'], required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Lien vers le coach
});

module.exports = mongoose.model('User', userSchema);
