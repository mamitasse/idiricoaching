import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CoachDashboard.css";

const CoachDashboard = () => {
  const [coachName, setCoachName] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [adherents, setAdherents] = useState([]);
  const [selectedAdherent, setSelectedAdherent] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [newSlot, setNewSlot] = useState({ startTime: "", endTime: "" });
  const navigate = useNavigate();

  // Charger les informations du coach
  useEffect(() => {
    const fetchCoachInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Veuillez vous connecter.");
        window.location.href = "/login";
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("http://localhost:5000/api/users/me", { headers });
        setCoachName(`${response.data.firstName} ${response.data.lastName}`);
        setTodayDate(
          new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur :", error);
      }
    };

    fetchCoachInfo();
  }, []);

  // Charger les adhérents liés au coach
  useEffect(() => {
    const fetchAdherents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token manquant dans localStorage.");
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("http://localhost:5000/api/users/adherents", { headers });
        setAdherents(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des adhérents :", error.response?.data || error.message);
      }
    };

    fetchAdherents();
  }, []);

  // Charger les créneaux pour la date sélectionnée
  useEffect(() => {
    reloadSlots();
  }, [selectedDate]);

  const reloadSlots = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token manquant dans localStorage.");
      return;
    }
  
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`http://localhost:5000/api/slots?date=${selectedDate}`, { headers });
  
      // Fonction pour formater les heures
      const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
      };
  
      // Formatez les créneaux récupérés
      const formattedSlots = response.data.map((slot) => ({
        ...slot,
        startTime: formatTime(slot.startTime),
        endTime: formatTime(slot.endTime),
      }));
  
      if (formattedSlots.length === 0) {
        console.log("Aucun créneau trouvé, génération des créneaux par défaut...");
  
        const generateResponse = await axios.post(
          "http://localhost:5000/api/slots/generate-default",
          { date: selectedDate },
          { headers }
        );
  
        const generatedFormattedSlots = generateResponse.data.map((slot) => ({
          ...slot,
          startTime: formatTime(slot.startTime),
          endTime: formatTime(slot.endTime),
        }));
  
        setSlots(generatedFormattedSlots);
      } else {
        console.log("Créneaux récupérés depuis la base de données :", formattedSlots);
        setSlots(formattedSlots);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des créneaux :", error.response?.data || error.message);
    }
  };
  

  // Ajouter un créneau manuel
  const handleAddSlot = async () => {
    if (!newSlot.startTime || !newSlot.endTime) {
      alert("Veuillez remplir les heures de début et de fin.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Envoyer la requête pour ajouter un créneau
      await axios.post(
        "http://localhost:5000/api/coaches/add-slot",
        { ...newSlot, date: selectedDate, status: "available" },
        { headers }
      );

      alert("Créneau ajouté avec succès.");
      setNewSlot({ startTime: "", endTime: "" });
      reloadSlots();
    } catch (error) {
      console.error("Erreur lors de l’ajout d’un créneau :", error.response?.data || error.message);
    }
  };

  // Supprimer un créneau (le rendre indisponible)
  const handleDeleteSlot = async (slotId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.patch(`http://localhost:5000/api/slots/update-status`, { slotId, status: "unavailable" }, { headers });

      alert("Le créneau a été marqué comme indisponible.");
      reloadSlots();
    } catch (error) {
      console.error("Erreur lors de la suppression du créneau :", error.response?.data || error.message);
    }
  };

  // Marquer un créneau comme réservé
  const handleReserveSlot = async (slotId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.patch(`http://localhost:5000/api/slots/update-status`, { slotId, status: "reserved" }, { headers });

      alert("Le créneau a été marqué comme réservé.");
      reloadSlots();
    } catch (error) {
      console.error("Erreur lors de la réservation du créneau :", error.response?.data || error.message);
    }
  };

  // Naviguer vers le profil d’un adhérent
  const viewAdherentProfile = () => {
    if (!selectedAdherent) {
      alert("Veuillez sélectionner un adhérent.");
      return;
    }
    navigate(`/adherent/${selectedAdherent}`);
  };

  return (
    <div className="coach-dashboard">
      <h1>Bonjour {coachName}</h1>
      <p>Nous sommes le {todayDate}</p>

      <div>
        <h2>Adhérents</h2>
        <select value={selectedAdherent} onChange={(e) => setSelectedAdherent(e.target.value)}>
          <option value="">-- Sélectionnez un adhérent --</option>
          {adherents.map((adherent) => (
            <option key={adherent._id} value={adherent._id}>
              {adherent.firstName} {adherent.lastName}
            </option>
          ))}
        </select>
        <button onClick={viewAdherentProfile}>Voir le profil</button>
      </div>

      <div>
        <h2>Gestion des créneaux</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div className="slots-container">
          {slots.map((slot) => (
            <div
              key={slot._id}
              className={`slot ${
                slot.status === "reserved"
                  ? "reserved-slot"
                  : slot.status === "unavailable"
                  ? "unavailable-slot"
                  : "available-slot"
              }`}
            >
              {slot.startTime} - {slot.endTime}
              <div>
                <button onClick={() => handleDeleteSlot(slot._id)}>Indisponible</button>
                <button onClick={() => handleReserveSlot(slot._id)}>Réserver</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Ajouter un créneau</h2>
        <input
          type="time"
          value={newSlot.startTime}
          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
        />
        <input
          type="time"
          value={newSlot.endTime}
          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
        />
        <button onClick={handleAddSlot}>Ajouter</button>
      </div>
    </div>
  );
};

export default CoachDashboard;
