import React, { useEffect, useState } from 'react';

const CoachDashboard = () => {
  const [adherents, setAdherents] = useState([]);
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchAdherents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/coaches/adherents', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Vérification si la réponse est bien du JSON
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setAdherents(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des adhérents:', error);
      }
    };

    fetchAdherents();
  }, []);

  const addSlot = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/coaches/add-slot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date, timeSlots: timeSlots.split(',').map(ts => ({ time: ts.trim() })) }), // Créneaux sous forme d'objet
    });

    if (response.ok) {
      alert('Créneau ajouté avec succès');
      setDate('');
      setTimeSlots('');
      // Recharger les créneaux après ajout
      const updatedSlots = await response.json();
      setAvailableSlots(updatedSlots);
    } else {
      alert('Erreur lors de l\'ajout du créneau');
    }
  };

  // Récupérer les créneaux disponibles après ajout
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const token = localStorage.getItem('token');
      const coachId = ''; // Remplace avec l'ID du coach si nécessaire
      const response = await fetch(`http://localhost:5000/api/coaches/${coachId}/slots`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data);
      } else {
        console.error('Erreur lors de la récupération des créneaux disponibles:', response.statusText);
      }
    };

    fetchAvailableSlots();
  }, []);

  return (
    <div>
      <h2>Coach Dashboard</h2>
      <h3>Ajouter des créneaux disponibles</h3>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input
        type="text"
        placeholder="Créneaux horaires (ex: 10:00, 11:00)"
        value={timeSlots}
        onChange={(e) => setTimeSlots(e.target.value)}
      />
      <button onClick={addSlot}>Ajouter créneau</button>

      <h3>Vos créneaux disponibles</h3>
      <ul>
        {availableSlots.map((slot, index) => (
          <li key={index}>
            {slot.date} - {slot.timeSlots.map((ts) => ts.time).join(', ')}
          </li>
        ))}
      </ul>

      <h3>Liste des adhérents</h3>
      <ul>
        {adherents.map((adherent) => (
          <li key={adherent._id}>{adherent.firstName} {adherent.lastName} - {adherent.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoachDashboard;
