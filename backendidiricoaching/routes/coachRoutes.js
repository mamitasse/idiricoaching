const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const User = require('../models/user'); // Utilisez le modèle User pour les adhérents
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Route pour récupérer les coachs
router.get('/coaches', async (req, res) => {
  try {
    const coaches = await User.find({ role: 'coach' }); // Récupérer les utilisateurs avec le rôle 'coach'
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des coachs' });
  }
});



// Route pour récupérer la liste des adhérents (accessible uniquement aux coaches)
router.get('/adherents', authMiddleware, roleMiddleware(['coach']), async (req, res) => {
  try {
    // Récupérer l'ID du coach à partir du token
    const coachId = req.user.id;
    const adherents = await Adherent.find({ coachId }); // Filtrer les adhérents par coachId
    res.status(200).json(adherents);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des adhérents.');
  }
});



// Route pour récupérer la liste des adhérents (accessible uniquement aux coaches)
router.get('/adherents', authMiddleware, roleMiddleware(['coach']), async (req, res) => {
  try {
    const adherents = await User.find({ role: 'adherent' }); // Récupérer les utilisateurs avec le rôle 'adherent'
    res.status(200).json(adherents);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des adhérents.');
  }
});

// Route pour ajouter des créneaux disponibles (Coach uniquement)
router.post('/:id/add-slot', authMiddleware, roleMiddleware(['coach']), async (req, res) => {
  const { date, timeSlots } = req.body;
  const coachId = req.params.id;

  if (!date || !timeSlots) {
    return res.status(400).send("Date et créneaux horaires requis.");
  }

  try {
    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).send("Coach non trouvé");

    // Ajouter les créneaux
    coach.availableSlots.push({ date, timeSlots });
    await coach.save();

    res.status(200).send("Créneaux ajoutés avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'ajout des créneaux.");
  }
});

// Route pour afficher tous les créneaux disponibles d'un coach (accessible à tous)
router.get('/:id/slots', async (req, res) => {
  const coachId = req.params.id;

  try {
    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).send("Coach non trouvé");

    res.status(200).json(coach.availableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération des créneaux.");
  }
});

// Route pour réserver un créneau (Adhérent uniquement)
router.put('/:coachId/reserve-slot', authMiddleware, roleMiddleware(['adherent']), async (req, res) => {
  const { coachId } = req.params;
  const { date, time } = req.body;
  const adherentId = req.user.id;  // Obtenir l'ID de l'adhérent connecté depuis le token

  if (!date || !time) {
    return res.status(400).send("Date et heure requis.");
  }

  try {
    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).send("Coach non trouvé");

    const slot = coach.availableSlots.find(slot => slot.date === date);
    if (!slot) return res.status(404).send("Date non trouvée.");

    const timeSlot = slot.timeSlots.find(ts => ts.time === time);
    if (!timeSlot || timeSlot.reservedBy) return res.status(400).send("Créneau déjà réservé ou indisponible.");

    // Réserver le créneau
    timeSlot.reservedBy = adherentId;
    await coach.save();

    res.status(200).send("Créneau réservé avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la réservation du créneau.");
  }
});

// Route pour annuler une réservation (Coach ou Adhérent)
router.put('/:coachId/cancel-reservation', authMiddleware, async (req, res) => {
  const { coachId } = req.params;
  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).send("Date et heure requis.");
  }

  try {
    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).send("Coach non trouvé");

    const slot = coach.availableSlots.find(slot => slot.date === date);
    if (!slot) return res.status(404).send("Date non trouvée.");

    const timeSlot = slot.timeSlots.find(ts => ts.time === time);
    if (!timeSlot || !timeSlot.reservedBy) return res.status(400).send("Créneau non réservé.");

    // Annuler la réservation
    timeSlot.reservedBy = null;
    await coach.save();

    res.status(200).send("Réservation annulée avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'annulation de la réservation.");
  }
});

module.exports = router;
