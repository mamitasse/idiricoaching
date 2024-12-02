//pages/contact.js
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    recipient: '', // Ajout d'un champ pour le destinataire
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifie les données avant de les envoyer
    console.log("Données du formulaire:", formData);

    // Adresses email des destinataires
    const emailMapping = {
      nadia: 'idirinadia10@gmail.com',
      sabrina: 'idiri.tassa@gmail.com',
    };

    // Préparation des données à envoyer
    const emailToSend = emailMapping[formData.recipient];

    if (!emailToSend) {
      alert("Veuillez sélectionner un destinataire.");
      return;
    }

    const messageData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      recipient: formData.recipient,  // Utilise 'recipient' comme champ attendu par le backend
    };

    try {
      // Appel API pour envoyer l'email via ton backend
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        alert('Votre message a été envoyé avec succès!');
        setFormData({ name: '', email: '', message: '', recipient: '' });
      } else {
        alert('Une erreur est survenue lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      alert('Une erreur est survenue lors de l\'envoi du message.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <p>
        Pour toute question, information, ou demande de service, n'hésitez pas à nous contacter via le formulaire ci-dessous. Nous vous répondrons dans les plus brefs délais.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message :</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        {/* Ajout d'un champ de sélection pour le destinataire */}
        <label htmlFor="recipient">Envoyer à :</label>
        <select
          id="recipient"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez le destinataire</option>
          <option value="nadia">Nadia</option>
          <option value="sabrina">Sabrina</option>
        </select>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
