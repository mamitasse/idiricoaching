import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdherentDashboard = () => {
  const [user, setUser] = useState(null); // Informations de l'utilisateur connecté
  const [availableSlots, setAvailableSlots] = useState([]); // Créneaux disponibles
  const [reservedSlots, setReservedSlots] = useState([]); // Créneaux réservés
  const [selectedSlot, setSelectedSlot] = useState(''); // Créneau sélectionné pour réservation

  // Récupérer les informations de l'utilisateur
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Veuillez vous connecter.');
          window.location.href = '/login';
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        if (response.data.coachId) {
          fetchAvailableSlots(response.data.coachId._id); // Récupère les créneaux pour le coach
        }
        fetchReservedSlots(response.data._id); // Récupère les créneaux réservés par l'adhérent
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
        alert('Impossible de récupérer vos informations.');
      }
    };

    fetchUserInfo();
  }, []);

  // Récupérer les créneaux disponibles pour le coach
  const fetchAvailableSlots = async (coachId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/coaches/${coachId}/slots?status=available`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des créneaux disponibles :', error);
      alert('Erreur lors de la récupération des créneaux disponibles.');
    }
  };

  // Récupérer les créneaux réservés par l'adhérent
  const fetchReservedSlots = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/reservations/adherent/${user._id}/reserved-slots`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        const response = await axios.put(
            'http://localhost:5000/api/reservations/reserve-slot',
            { slotId: selectedSlot }, // Transmet le slotId
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert('Créneau réservé avec succès.');
        setReservedSlots([...reservedSlots, response.data.slot]); // Ajoute le créneau réservé
        setAvailableSlots(availableSlots.filter((slot) => slot._id !== selectedSlot)); // Supprime le créneau des créneaux disponibles
        setSelectedSlot(''); // Réinitialise la sélection
    } catch (error) {
        console.error('Erreur lors de la réservation du créneau :', error);
        alert('Impossible de réserver ce créneau.');
    }
};


  return (
    <div>
      <h1>Tableau de Bord de l'Adhérent</h1>
      {user && (
        <h2>
          Bienvenue {user.firstName}, votre coach est {user.coachId?.firstName || 'inconnu'}.
        </h2>
      )}

      <h3>Créneaux disponibles</h3>
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      >
        <option value="">Sélectionnez un créneau à réserver</option>
        {availableSlots.map((slot) => (
          <option key={slot._id} value={slot._id}>
            {`${slot.date} | ${slot.startTime} - ${slot.endTime}`}
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
