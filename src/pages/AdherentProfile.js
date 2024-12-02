import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AdherentProfile.css';

const AdherentProfile = () => {
  const { adherentId } = useParams();
  const [adherent, setAdherent] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchAdherentData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Récupérer les informations de l'adhérent
        const userResponse = await axios.get(`http://localhost:5000/api/users/${adherentId}`, { headers });
        setAdherent(userResponse.data);

        // Récupérer les réservations de l'adhérent
        const reservationsResponse = await axios.get(
          `http://localhost:5000/api/reservations/${adherentId}/reservations`,
          { headers }
        );
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l’adhérent :', error);
      }
    };

    fetchAdherentData();
  }, [adherentId]);

  return (
    <div className="adherent-profile">
      <h1>Profil de {adherent.firstName} {adherent.lastName}</h1>
      <p>Email : {adherent.email}</p>
      <p>Coach Assigné : {adherent.coachId?.firstName} {adherent.coachId?.lastName}</p>
      <p>Âge : {adherent.age}</p>
      <p>Genre : {adherent.gender}</p>

      <h2>Réservations</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              {reservation.date} de {reservation.startTime} à {reservation.endTime} avec le coach{" "}
              {reservation.coach?.firstName} {reservation.coach?.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune réservation trouvée.</p>
      )}
    </div>
  );
};

export default AdherentProfile;
