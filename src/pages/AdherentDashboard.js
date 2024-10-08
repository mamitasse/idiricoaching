import React, { useState, useEffect } from 'react';

const AdherentDashboard = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération des créneaux disponibles
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5000/api/coaches/slots', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setAvailableSlots(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des créneaux');
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, []);

  // Fonction de réservation de créneau
  const reserveSlot = async (date, time) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/coaches/reserve-slot', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la réservation');
      }

      // Si la réservation est réussie, on récupère les créneaux mis à jour
      const updatedSlots = await response.json();
      setAvailableSlots(updatedSlots);
      alert('Créneau réservé avec succès');
    } catch (err) {
      alert(err.message || 'Erreur lors de la réservation');
    }
  };

  // Affichage de l'état du chargement ou des erreurs
  if (loading) {
    return <div>Chargement des créneaux disponibles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Adherent Dashboard</h2>
      <h3>Créneaux disponibles</h3>
      <ul>
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <li key={index}>
              {slot.date} - {slot.timeSlots.map((ts) => (
                <span key={ts.time}>
                  {ts.time} {ts.reservedBy ? '(Réservé)' : <button onClick={() => reserveSlot(slot.date, ts.time)}>Réserver</button>}
                </span>
              ))}
            </li>
          ))
        ) : (
          <li>Aucun créneau disponible pour le moment</li>
        )}
      </ul>
    </div>
  );
};

export default AdherentDashboard;
