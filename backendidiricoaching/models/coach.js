const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le modèle Coach avec ses créneaux disponibles
const CoachSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  availableSlots: [
    {
      date: { type: String, required: true },
      timeSlots: [
        {
          time: { type: String, required: true },
          reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Adherent', default: null } // Liaison avec l'adhérent si le créneau est réservé
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Coach', CoachSchema);
