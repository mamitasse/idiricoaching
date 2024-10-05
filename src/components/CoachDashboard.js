// src/CoachDashboard.js
import React, { useEffect, useState } from 'react';

const CoachDashboard = () => {
  const [adherents, setAdherents] = useState([]);

  useEffect(() => {
    const fetchAdherents = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/coaches/adherents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAdherents(data);
    };

    fetchAdherents();
  }, []);

  return (
    <div>
      <h2>Coach Dashboard</h2>
      <ul>
        {adherents.map((adherent) => (
          <li key={adherent._id}>{adherent.name} - {adherent.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoachDashboard;
