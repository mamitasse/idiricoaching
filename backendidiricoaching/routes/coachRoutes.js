//IDIRICOACHING/backendendidiricoaching/routes/coachRoutes.js

const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const Slot = require('../models/slot');
const { getAvailableSlotsByCoach } = require("../controllers/coachController");
const User = require('../models/user'); // Ajout de cette ligne

// Route pour récupérer tous les créneaux d'un coach spécifique
router.get('/:coachId/slots', authMiddleware, roleMiddleware(['coach', 'adherent']), async (req, res) => {
    const { coachId } = req.params;
    const { status, date } = req.query; // Option de filtre par statut ou date
    console.log("Requête reçue :", req.params, req.query); // Debug: Log des paramètres reçus

    try {
        // Vérifiez que l'ID du coach est valide
        if (!coachId.match(/^[0-9a-fA-F]{24}$/)) {
            console.log("ID coach invalide :", coachId);
            return res.status(400).json({ error: 'ID de coach invalide.' });
        }

        // Vérifiez si le coach existe dans la base de données
        const coachExists = await User.findById(coachId);
        if (!coachExists || coachExists.role !== 'coach') {
            console.log("Coach introuvable :", coachId);
            return res.status(404).json({ error: 'Coach introuvable.' });
        }

        // Construire le filtre de requête MongoDB
        const filter = { coach: coachId };
        if (status) filter.status = status;
        if (date) filter.date = date;

        console.log("Filtre MongoDB :", filter); // Debug: Afficher le filtre construit

        // Récupérer les créneaux
        const slots = await Slot.find(filter)
            .sort({ startTime: 1 })
            .populate('bookedBy', 'firstName lastName email');

        console.log("Créneaux récupérés :", slots); // Debug: Afficher les résultats

        if (!slots || slots.length === 0) {
            return res.status(404).json({ error: 'Aucun créneau trouvé pour ce coach.' });
        }

        res.status(200).json(slots);
    } catch (error) {
        console.error('Erreur lors de la récupération des créneaux :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des créneaux.' });
    }
});




  // Route pour ajouter un créneau (seulement pour les coaches)
router.post('/add-slot', authMiddleware, roleMiddleware(['coach']), async (req, res) => {
    const { date, startTime, endTime, status } = req.body;
    const coachId = req.user.userId; // ID du coach connecté

    // Validation des données
    if (!date || !startTime || !endTime) {
        return res.status(400).json({ error: 'La date, l\'heure de début et l\'heure de fin sont obligatoires.' });
    }

    try {
        const newSlot = new Slot({
            coach: coachId,
            date,
            startTime,
            endTime,
            status: status || 'available', // Statut par défaut : "available"
        });

        const savedSlot = await newSlot.save();
        res.status(201).json(savedSlot); // Retourne le créneau créé
    } catch (error) {
        console.error('Erreur lors de l’ajout du créneau :', error);
        res.status(500).json({ error: 'Erreur serveur lors de l’ajout du créneau.' });
    }
});




// Route pour ajouter un créneau
router.post('/slots', authMiddleware, roleMiddleware(['coach']), async (req, res) => {
    const { coachId, date } = req.body;

    if (!coachId || !date) {
        return res.status(400).json({ error: 'Coach ID et date sont requis.' });
    }

    try {
        const slot = new Slot({
            coach: coachId,
            date,
            isBooked: false,
        });
        await slot.save();

        res.status(201).json(slot);
    } catch (error) {
        console.error('Erreur lors de la création du créneau:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la création du créneau.' });
    }
});

// Route pour supprimer un créneau
router.delete('/slots/:slotId', authMiddleware, roleMiddleware(['coach']), async (req, res) => {
    try {
        const { slotId } = req.params;
        await Slot.findByIdAndDelete(slotId);
        res.status(200).json({ message: 'Créneau supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du créneau:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression du créneau.' });
    }
});

module.exports = router;
