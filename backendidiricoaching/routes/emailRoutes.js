const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { name, email, message, recipient } = req.body;

  console.log("Données reçues dans la requête POST:", req.body);

  // Vérification que tous les champs sont fournis
  if (!name || !email || !message || !recipient) {
    console.log("Champs manquants :", { name, email, message, recipient });
    return res.status(400).send("Tous les champs sont requis.");
  }

  // Vérification explicite de la valeur du destinataire
  let recipientEmail;
  if (recipient === 'nadia') {
    recipientEmail = process.env.NADIA_EMAIL;
  } else if (recipient === 'sabrina') {
    recipientEmail = process.env.SABRINA_EMAIL;
  } else {
    console.log("Destinataire non valide :", recipient);
    return res.status(400).send("Destinataire invalide.");
  }

  console.log("Email du destinataire:", recipientEmail);

  // Créer le transporteur Nodemailer
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Modifie le corps de l'email pour inclure nom et email
  const mailOptions = {
    from: email, // L'email de la personne qui envoie le message
    to: recipientEmail,
    subject: `Message de ${name}`, // Le nom de l'expéditeur dans le sujet
    text: `Vous avez reçu un nouveau message:\n\nNom: ${name}\nEmail: ${email}\n\nMessage: ${message}`, // Inclure explicitement le nom et l'email dans le corps du message
  };

  console.log("Options d'email préparées:", mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès");
    res.status(200).send('Email envoyé avec succès');
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).send("Erreur lors de l'envoi de l'email");
  }
});

module.exports = router;
