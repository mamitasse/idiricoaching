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
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l’adhérent :', error);
      }
    };

    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Récupérer les réservations de l'adhérent
        const reservationsResponse = await axios.get(
          `http://localhost:5000/api/reservations/${adherentId}/reserved-slots`,
          { headers }
        );
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations de l’adhérent :', error);
      }
    };

    fetchAdherentData();
    fetchReservations();
  }, [adherentId]);

  return (
    <div className="adherent-profile">
      <h1>Profil de {adherent.firstName} {adherent.lastName}</h1>
      <p><strong>Email :</strong> {adherent.email}</p>
      <p><strong>Adresse :</strong> {adherent.address || "Non renseignée"}</p>
      <p><strong>Téléphone :</strong> {adherent.phone || "Non renseigné"}</p>
      <p><strong>Coach Assigné :</strong> {adherent.coachId?.firstName} {adherent.coachId?.lastName}</p>
      <p><strong>Âge :</strong> {adherent.age}</p>
      <p><strong>Genre :</strong> {adherent.gender}</p>

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
