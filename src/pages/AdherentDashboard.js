import api from '../api'; // Importe l'instance axios configurée
import React, { useState, useEffect } from 'react';

import './AdherentDashboard.css';

const AdherentDashboard = () => {
  const [user, setUser] = useState(null); // Informations de l'utilisateur connecté
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Date sélectionnée
  const [availableSlots, setAvailableSlots] = useState([]); // Créneaux disponibles pour la date
  const [reservedSlots, setReservedSlots] = useState([]); // Créneaux réservés par l'utilisateur
  const [selectedSlot, setSelectedSlot] = useState(''); // Créneau sélectionné pour réservation

  // Récupérer les informations de l'utilisateur connecté
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Veuillez vous connecter.');
          window.location.href = '/login';
          return;
        }

        const response = await api.get('api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        if (response.data.coachId) {
          await fetchAvailableSlots(response.data.coachId._id, selectedDate); // Récupère les créneaux pour le coach et la date
        }
        await fetchReservedSlots(response.data._id); // Récupère les créneaux réservés par l'utilisateur
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
        alert('Impossible de récupérer vos informations.');
      }
    };

    fetchUserInfo();
  }, [selectedDate]);

  // Récupérer les créneaux disponibles pour le coach et la date
  const fetchAvailableSlots = async (coachId, date) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(
        `api/coaches/${coachId}/slots?date=${date}&status=available`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des créneaux disponibles :', error);
      setAvailableSlots([]); // Réinitialise la liste si une erreur survient
    }
  };

  // Récupérer les créneaux réservés par l'utilisateur
  const fetchReservedSlots = async (adherentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(
        `api/reservations/adherent/${adherentId}/reserved-slots`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReservedSlots(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des créneaux réservés :', error);
    }
  };

  // Réserver un créneau
  const handleReserveSlot = async () => {
    if (!selectedSlot) {
      alert('Veuillez sélectionner un créneau.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await api.patch(
        'api/reservations/reserve-slot',
        { slotId: selectedSlot },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Créneau réservé avec succès.');
      setSelectedSlot(''); // Réinitialise la sélection
      await fetchReservedSlots(user._id); // Recharge la liste des créneaux réservés
      await fetchAvailableSlots(user.coachId._id, selectedDate); // Recharge les créneaux disponibles
    } catch (error) {
      console.error('Erreur lors de la réservation du créneau :', error.response?.data || error.message);
      alert('Impossible de réserver ce créneau.');
    }
  };

  return (
    <div className='main'>
      <h1>Tableau de Bord de l'Adhérent</h1>
      {user && (
        <h2>
          Bienvenue {user.firstName}, votre coach est {user.coachId?.firstName || 'inconnu'}.
        </h2>
      )}

      <h3>Créneaux disponibles</h3>
      <div className='Creneaux' style={{ paddingBottom: '20px' }}>
        <label htmlFor="slot-date">Sélectionnez une date :</label>
        <input
          id="slot-date-ADHERENT"
          type="date"
          value={selectedDate}
          onChange={async (e) => {
            const chosenDate = e.target.value;
            setSelectedDate(chosenDate);

            if (user && user.coachId) {
              await fetchAvailableSlots(user.coachId._id, chosenDate);
            }
          }}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
      </div>

      <select className='selection'
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      >
        <option value="">Sélectionnez un créneau à réserver</option>
        {availableSlots.map((slot) => (
          <option key={slot._id} value={slot._id}>
            {`${slot.startTime} - ${slot.endTime}`}
          </option>
        ))}
      </select>

      <button onClick={handleReserveSlot} disabled={!selectedSlot}>
        Réserver
      </button>

      <h3>Vos créneaux réservés</h3>
      {reservedSlots.length === 0 ? (
        <p>Vous n'avez pas encore réservé de créneaux.</p>
      ) : (
        <ul>
          {reservedSlots.map((slot) => (
            <li key={slot._id}>
              {`${slot.date} | ${slot.startTime} - ${slot.endTime}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdherentDashboard;
