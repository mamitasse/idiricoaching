const Slot = require('../models/slot');

// Réserver un créneau


exports.reserveSlot = async (req, res) => {
    const { slotId } = req.body;
    const adherentId = req.user.userId;
  
    try {
      const slot = await Slot.findById(slotId);
  
      if (!slot) {
        return res.status(404).json({ error: 'Créneau introuvable.' });
      }
  
      if (slot.status !== 'available') {
        return res.status(400).json({ error: 'Ce créneau est déjà réservé.' });
      }
  
      // Réserver le créneau
      slot.status = 'reserved';
      slot.bookedBy = adherentId;
      await slot.save();
      console.log('Créneau sauvegardé dans la base de données :', slot);
      

      
  
      res.status(200).json({ message: 'Créneau réservé avec succès.', slot });
    } catch (error) {
      console.error('Erreur lors de la réservation du créneau :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la réservation.' });
    }
  };
  

// Annuler une réservation
exports.cancelReservation = async (req, res) => {
  const { slotId } = req.params;

  try {
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ error: 'Créneau non trouvé.' });
    }

    if (slot.status !== 'reserved') {
      return res.status(400).json({ error: 'Ce créneau n\'est pas réservé.' });
    }

    // Vérification des permissions
    if (slot.bookedBy.toString() !== req.user.userId && req.user.role !== 'coach') {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à annuler cette réservation.' });
    }

    // Annuler la réservation
    slot.status = 'available';
    slot.bookedBy = null;
    await slot.save();

    res.status(200).json({ message: 'Réservation annulée avec succès.', slot });
  } catch (error) {
    console.error('Erreur lors de l\'annulation de la réservation :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};
