const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Obligatoire
  },
  date: {
    type: String, // Format YYYY-MM-DD
    required: true,
  },
  startTime: {
    type: String, // Format HH:mm
    required: true,
  },
  endTime: {
    type: String, // Format HH:mm
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'unavailable'],
    default: 'available',
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence à l'utilisateur qui a réservé
    default: null,
  },
});

module.exports = mongoose.model('Slot', slotSchema);
